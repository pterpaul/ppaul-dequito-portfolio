# Company Profile Template

This folder is the public-facing template for one company profile. The five `company_profile_*` folders share the same architecture so each can later become a separate PHP-managed site.

## Architecture

- `index.html`: presentation layer; replace with PHP includes when the CMS is ready.
- `assets/css/tailwind.css`: Tailwind source entry.
- `assets/css/output.css`: generated Tailwind stylesheet.
- `assets/css/custom.css`: distributor layout, responsive cards, dark/light theme, modal, and chat styling.
- `assets/js/company-data.js`: single content contract for PHP-managed company text, cards, metrics, and contact details.
- `assets/js/company-profile.js`: rendering, mobile navigation, theme switch, card modals, show more/show less, and chat behavior.
- `../../assets/img/ppd_ap.mp4`: local demo video used by the full-screen hero; replace this reference with an admin-managed company video.
- `../../assets/img/pfz_gallery/photo0.jpg`: hero poster and reduced-motion fallback.

## Build Tailwind

From the project root:

```powershell
npx @tailwindcss/cli -i company_profile_01/assets/css/tailwind.css -o company_profile_01/assets/css/output.css
```

The design intentionally removes pricing. It combines a cinematic full-screen hero, portfolio-style scroll sections, enterprise distributor proof points, card detail modals, and a lightweight bottom chat prompt.

For PHP, keep `companyProfileData` as the only content boundary. Validate and JSON-encode admin values server-side before printing them into the page. The `capabilitiesList` and `principalsList` arrays control the card grids and modal content.
