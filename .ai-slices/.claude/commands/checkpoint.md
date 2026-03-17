# Checkpoint - Short Slice Workflow Snapshot

Produce a concise state snapshot for long sessions.

Read:

- `docs/slices.md`
- `docs/slice-progress.md`
- `docs/changes.md` if it exists

Output:

- current ready slice
- current stale slices
- current blocked slices
- last change logged
- exact next command

Keep the output brief. This command is internal support for long-running sessions.
