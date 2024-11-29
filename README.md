---
marp: true
author: Massi
size: 16:9
theme: gaia
paginate: true
---

![bg center](./cover.webp)

---

## Refs

Refs (short for references) are simple pointers stored in the .git directory. These pointers help Git locate specific objects (like commits) in the repository.

Refs are stored as plain text files under the .git/refs directory or as symbolic refs.

---

### Types of Refs and Their Details

**1. Branch Refs**

- Found in .git/refs/heads/.

- Each file represents a branch, and its content is the SHA-1 hash of the latest commit on that branch.

```bash
cat .git/refs/heads/main
# Output: f3c4b2e8d7a9e4d4f8f43e8a183ff98d9c5e87fa
```

Here, main is a branch, and its value is the SHA of the commit it points to.

---

- When you make a new commit on a branch, Git updates the corresponding ref file to point to the new commit.

**2. Tag Refs**

- Found in .git/refs/tags/.

- A tag ref points to a specific commit (or sometimes another object, like a tree).

- Tags are used for marking releases.

```bash
git tag v1.0.0
cat .git/refs/tags/v1.0.0
# Output: f3c4b2e8d7a9e4d4f8f43e8a183ff98d9c5e87fa
```

---

- Annotated tags are stored as Git objects and include metadata (message, author). Lightweight tags are simple refs pointing to a commit.

**3. Remote Refs**

- Found in .git/refs/remotes/.

- Remote refs track the state of branches in remote repositories.

- Example: origin/main is a remote branch ref stored in .git/refs/remotes/origin/main.

- These refs are updated when you fetch or pull changes from the remote repository.

---

**4. HEAD (Symbolic Ref)**

- HEAD is a special symbolic ref that points to the current branch or commit.

- It's stored in .git/HEAD and usually points to a branch:

```bash
cat .git/HEAD
# Output: ref: refs/heads/main
```

If you’re in a detached HEAD state (e.g., checked out a specific commit), HEAD points directly to the commit SHA:

```bash
cat .git/HEAD
# Output: f3c4b2e8d7a9e4d4f8f43e8a183ff98d9c5e87fa
```

---

### Special Refs

Git uses several special refs for internal operations:

- FETCH_HEAD
- MERGE_HEAD
- ORIG_HEAD
- CHERRY_PICK_HEAD

---

## Git Objects

There are four primary types of objects in Git:

- Blob (Binary Large Object)
- Tree
- Commit
- Tag

---

**1. Blob Objects**

A blob (short for "binary large object") is one of Git's four core object types and represents the contents of a file in the repository. It stores the raw data of a file without any metadata like filenames, permissions, or directory structures.

```css
blob <content size>\0<file content>
```

Blob content:

```bash
git cat-file -p <blob-sha>
# Output: Hello, Git!
```

---

**Example Blob Serialization:**

```
Hello, Git!
```

The blob content in memory would be:

```sql
blob 12\0Hello, Git!
```

- 12 is the size of the content in bytes.
- \0 separates the metadata and the content.

---

- **Blob Hashing**
  Git uses the SHA-1 hash (or SHA-256 in newer versions) to compute a unique ID for the blob based on its serialized content.This hash serves as the blob's identifier.

**Example Hash Calculation:**
For a file with Hello, Git!:

```bash
echo -n "blob 12\0Hello, Git!" | sha1sum
```

Output:

```
8ab686eafeb1f44702738c8b0f24f2567c36da6d
```

---

#### Why SHA-1 Was Used in Git?

In Git, SHA-1 is used as the identifier for objects (blobs, trees, commits, etc.). It provides a way to uniquely identify a file or piece of data based on its content, allowing Git to efficiently track changes, avoid duplication, and detect data corruption.

---

- **Storing a Blob**
  When Git creates a blob, it writes it to the .git/objects directory under a path derived from the hash.

- The hash is split into two parts: the first two characters form a directory, and the remaining characters form the filename.
- For example, 8ab686eafeb1f44702738c8b0f24f2567c36da6d is stored as:

```bash
.git/objects/8a/b686eafeb1f44702738c8b0f24f2567c36da6d
```

---

**2. Tree:**

A `tree object` represents the structure of a directory (folder) at a specific point in time. It acts as a container that maps filenames to the corresponding blobs (file contents) and other tree objects (subdirectories). Trees allow Git to efficiently manage hierarchical structures like file systems.

---

**Tree Object Structure**
A tree object contains:

- **Mode:** File type and permissions (e.g., 100644 for a file, 040000 for a directory).
- **Type:** Identifies whether the object is a blob (file) or another tree (subdirectory).
- **SHA-1 Hash:** Points to the content (blob or subdirectory).
- **Name:** The filename or directory name.

```sql
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    file1.txt
100644 blob 8ab686eafeb1f44702738c8b0f24f2567c36da6d    file2.txt
040000 tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904    subdir
```

---

**3. Commits:**

- A Commit in Git is a snapshot of the state of your project at a specific point in time.

- It represents the following:
  - A reference to the state of the repository (files and directories).
  - Metadata (e.g., author, commit message, timestamp).
    A connection to its parent commit(s) to maintain the history

---


**How Commits Are Stored**

1. Git creates a commit object in the .git/objects directory.
2. The commit is identified by its SHA-1 hash, calculated based on its content.
3. Git compresses and stores the commit for efficient storage.

To View a Commit Object:

```bash
git cat-file -p <commit-hash>
```

This command displays the details of a specific commit.