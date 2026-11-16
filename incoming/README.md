# incoming

The inbox for Fatema's photos. Drop each batch here in its own folder, for
example `incoming/2026-11-20/`. Nothing in this folder is published or
committed: only this note is tracked in git.

For each batch, every image is looked at and then either:

- copied into its own piece folder under `src/content/work/`, with a
  descriptive kebab-case name and a draft title, story, alt text and proposed
  collection for Ali to confirm, or
- flagged, because it is not a clean photo of the real piece (a poster with
  text on it, an AI render or mockup, a heavy filter, a screenshot). A flagged
  image stays here and is not used until the original arrives.

The files dropped here are never edited. The site makes its own resized
copies when it builds.

Client names that appear inside a photo are fine. They are kept out of file
names, alt text and captions.
