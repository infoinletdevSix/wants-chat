-- Performance Indexes Migration
-- Adds composite indexes for frequently queried columns to improve query performance

-- NOTE: CREATE INDEX is intentionally NOT CONCURRENTLY here.
-- Migrations run inside a transaction, and several index creations
-- are wrapped in DO $$ ... $$ blocks; both contexts disallow CONCURRENTLY.
-- If you need a non-blocking index on a hot table in production,
-- run it manually outside the migration runner.

-- ============================================
-- Research Sessions Table Indexes (if exists)
-- ============================================
-- These are created only if the table exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'research_sessions') THEN
        -- Composite index for user's research history
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_research_sessions_user_created
            ON research_sessions(user_id, created_at DESC)';

        -- Partial index for active research sessions
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_research_sessions_active
            ON research_sessions(user_id, status)
            WHERE status IN (''pending'', ''planning'', ''searching'', ''extracting'', ''analyzing'', ''synthesizing'')';
    END IF;
END
$$;

-- ============================================
-- Autonomous Tasks Table Indexes (if exists)
-- ============================================
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'autonomous_tasks') THEN
        -- Composite index for user's task history
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_user_created
            ON autonomous_tasks(user_id, created_at DESC)';

        -- Partial index for running tasks
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_running
            ON autonomous_tasks(user_id, status)
            WHERE status IN (''pending'', ''running'', ''paused'')';
    END IF;
END
$$;

-- ============================================
-- Media Usage Logs Table Indexes (if exists)
-- ============================================
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'media_usage_logs') THEN
        -- Composite index for user's media usage aggregation
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_media_usage_user_date_status
            ON media_usage_logs(user_id, created_at, status)';

        -- Partial index for successful operations
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_media_usage_success
            ON media_usage_logs(user_id, created_at) WHERE status = ''success''';
    END IF;
END
$$;
