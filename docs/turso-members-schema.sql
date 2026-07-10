-- HAEGIN Turso members table
-- Copy and paste this SQL into the Turso SQL editor or run it with the Turso CLI.

CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_members_user_id ON members (user_id);
CREATE INDEX IF NOT EXISTS idx_members_phone ON members (phone);
CREATE INDEX IF NOT EXISTS idx_members_role ON members (role);

-- Existing database migration:
-- If your members table was created before the role column existed, run:
-- ALTER TABLE members
-- ADD COLUMN role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin'));
--
-- CREATE INDEX IF NOT EXISTS idx_members_role ON members (role);

-- Promote a member to admin:
-- UPDATE members SET role = 'admin' WHERE user_id = 'your_admin_id';
