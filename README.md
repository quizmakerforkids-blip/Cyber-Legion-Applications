# Cyber Legion All-Applications Portal — Netlify Version

## Pages

- Public form: `https://YOUR-SITE.netlify.app`
- Private dashboard: `https://YOUR-SITE.netlify.app/admin`

The dashboard displays each applicant's Roblox username, Discord username, date, and complete answers.

## 1. Create the Supabase database

1. Create a free Supabase project.
2. Open **SQL Editor**.
3. Paste all contents of `supabase.sql`.
4. Click **Run**.
5. Open **Project Settings → API** and copy:
   - Project URL
   - `service_role` key

Keep the service-role key private.

## 2. Deploy through GitHub to Netlify

Netlify Functions need Netlify to process the project, so connecting a GitHub repository is the easiest reliable method.

1. Extract this ZIP.
2. Create a new GitHub repository.
3. Upload every extracted file and folder, including:
   - `public`
   - `netlify`
   - `netlify.toml`
   - `package.json`
4. In Netlify choose **Add new project → Import an existing project**.
5. Select GitHub and choose the repository.
6. Netlify should detect:
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
7. Deploy the site.

## 3. Add environment variables in Netlify

Open:

**Site configuration → Environment variables**

Add:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
SESSION_SECRET
```

Values:

- `SUPABASE_URL`: your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: your private service-role key
- `ADMIN_PASSWORD`: the password you want to use for `/admin`
- `SESSION_SECRET`: a long random string, preferably 40+ characters

After adding or changing variables, trigger a new deploy.

## 4. Use the website

Share only the normal homepage with applicants:

```text
https://YOUR-SITE.netlify.app
```

Open this yourself to review responses:

```text
https://YOUR-SITE.netlify.app/admin
```

Do not share the admin password.


## Included application types

- Trial Moderator
- Moderator
- Administrator
- Co-Owner
- Recruiter
- Event Host
- Alliance Manager
- Content Creator

Applicants choose a position before completing the form. The admin dashboard can filter applications by position.
