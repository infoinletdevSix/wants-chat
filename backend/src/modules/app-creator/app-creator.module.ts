import { Module } from '@nestjs/common';
import { AppCreatorController } from './app-creator.controller';
import { AppCreatorService } from './app-creator.service';
import { AiModule } from '../ai/ai.module';
import { DatabaseModule } from '../database/database.module';
import { BuildValidatorService } from './services/build-validator.service';
import { AutoRepairService } from './services/auto-repair.service';
import { PlatformService } from '../app-builder/services/platform.service';
import { DataSeederService } from '../app-builder/services/data-seeder.service';

@Module({
  imports: [AiModule, DatabaseModule],
  controllers: [AppCreatorController],
  providers: [
    AppCreatorService,
    BuildValidatorService,
    AutoRepairService,
    PlatformService,
    DataSeederService,
  ],
  exports: [AppCreatorService, BuildValidatorService, AutoRepairService],
})
export class AppCreatorModule {}
