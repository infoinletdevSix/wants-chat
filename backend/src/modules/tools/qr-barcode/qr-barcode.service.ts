import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as QRCode from 'qrcode';
// `jsbarcode` and `canvas` were removed from the open-source build because
// `canvas` requires native compilation that is fragile on Alpine. Server-side
// barcode generation is stubbed below; QR code generation still works.
import { R2Service } from '../../storage/r2.service';
import { generateToolOutputPath } from '../common/utils/file-helper.util';
import {
  QrGenerateDto,
  BarcodeGenerateDto,
  QrGenerateResponseDto,
  QrScanResponseDto,
  BarcodeGenerateResponseDto,
  QrErrorCorrectionLevel,
} from './dto/qr-barcode.dto';

@Injectable()
export class QrBarcodeService {
  private readonly logger = new Logger(QrBarcodeService.name);
  private qrScanner: any = null;

  constructor(private readonly r2Service: R2Service) {}

  async generateQr(dto: QrGenerateDto, userId: string): Promise<QrGenerateResponseDto> {
    const size = dto.size || 300;
    const format = dto.format || 'png';
    const errorCorrectionLevel = dto.errorCorrectionLevel || QrErrorCorrectionLevel.MEDIUM;

    const options: QRCode.QRCodeToDataURLOptions = {
      width: size,
      margin: dto.margin ?? 4,
      errorCorrectionLevel,
      color: {
        dark: dto.darkColor || '#000000',
        light: dto.lightColor || '#FFFFFF',
      },
    };

    let buffer: Buffer;
    let mimeType: string;

    if (format === 'svg') {
      const svg = await QRCode.toString(dto.data, { ...options, type: 'svg' });
      buffer = Buffer.from(svg, 'utf8');
      mimeType = 'image/svg+xml';
    } else {
      const dataUrl = await QRCode.toDataURL(dto.data, options);
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
      mimeType = 'image/png';
    }

    // Upload to storage
    const path = generateToolOutputPath(userId, 'qr-barcode', 'qr', format);
    const url = await this.uploadToStorage(buffer, path, mimeType);

    return {
      url,
      data: dto.data,
      format,
      size,
      sizeBytes: buffer.length,
    };
  }

  async scanQr(buffer: Buffer): Promise<QrScanResponseDto> {
    try {
      // Initialize scanner lazily
      if (!this.qrScanner) {
        const { Decoder } = await import('@nuintun/qrcode');
        this.qrScanner = new Decoder();
      }

      // Decode QR code from image
      const sharp = require('sharp');
      const { data, info } = await sharp(buffer)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Create ImageData-like object
      const result = await this.qrScanner.decode({
        data: new Uint8ClampedArray(data),
        width: info.width,
        height: info.height,
      });

      if (!result) {
        throw new BadRequestException('No QR code found in image');
      }

      return {
        data: result.data,
        type: 'QR_CODE',
        version: result.version,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(`QR scan failed: ${error.message}`);
      throw new BadRequestException('Failed to scan QR code from image');
    }
  }

  async generateBarcode(dto: BarcodeGenerateDto, userId: string): Promise<BarcodeGenerateResponseDto> {
    const width = dto.width || 200;
    const height = dto.height || 100;

    // Server-side barcode rendering is disabled in the open-source build
    // because the `canvas` native module is hard to install on Alpine.
    // QR code generation (above) still works through the `qrcode` package.
    throw new BadRequestException(
      'Server-side barcode generation is not available in the open-source build. ' +
      'Generate the barcode on the client instead, or re-add `canvas` and `jsbarcode` to the backend.',
    );

    // Unreachable, kept so the legacy callers below still type-check.
    // eslint-disable-next-line @typescript-eslint/no-unreachable
    try {
      const buffer = Buffer.alloc(0);

      // Upload to storage
      const path = generateToolOutputPath(userId, 'qr-barcode', 'barcode', 'png');
      const url = await this.uploadToStorage(buffer, path, 'image/png');

      return {
        url,
        data: dto.data,
        format: dto.format,
        width,
        height,
        sizeBytes: buffer.length,
      };
    } catch (error) {
      this.logger.error(`Barcode generation failed: ${error.message}`);
      throw new BadRequestException(`Failed to generate barcode: ${error.message}`);
    }
  }

  // Generate multiple QR codes (bulk)
  async generateBulkQr(
    dataList: string[],
    options: Partial<QrGenerateDto>,
    userId: string,
  ): Promise<QrGenerateResponseDto[]> {
    const results: QrGenerateResponseDto[] = [];

    for (const data of dataList) {
      const result = await this.generateQr({ ...options, data }, userId);
      results.push(result);
    }

    return results;
  }

  private async uploadToStorage(
    buffer: Buffer,
    path: string,
    contentType: string,
  ): Promise<string> {
    try {
      const url = await this.r2Service.uploadBuffer(buffer, path, contentType, {
        isPublic: true,
        metadata: { tool: 'qr-barcode' },
      });
      return url;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw new BadRequestException('Failed to upload generated file');
    }
  }
}
