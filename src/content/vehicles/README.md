# Vehicles for sale

Each car is one `.json` file in this folder. The file name becomes the web address:
`2015-ford-f150.json` → `/vehicles/2015-ford-f150`.

## Add a car

1. Copy an existing file and rename it `year-make-model.json` (lowercase, dashes, no spaces).
2. Edit the values:

```json
{
  "year": 2015,
  "make": "Ford",
  "model": "F-150",
  "trim": "XLT",
  "mileage": 98000,
  "priceUsd": 18500,
  "status": "available",
  "summary": "One-owner truck, well maintained.",
  "description": "Longer description.\n\nA blank line starts a new paragraph.",
  "features": ["4x4", "Automatic", "Tow package"],
  "photos": ["/vehicles/2015-ford-f150/1.jpg", "/vehicles/2015-ford-f150/2.jpg"],
  "listedOn": "2026-11-04"
}
```

3. Put photos in `public/vehicles/<same-name>/`. The first photo is the cover.

## Mark pending, sold or remove

- `"status": "pending"` keeps it listed with a **Sale pending** tag.
- `"status": "sold"` hides it from the site but keeps the file for your records.
- Delete the file to remove it completely.

If a value is wrong (say, a price typed as text), the build stops and names the file and field, so a typo can't break the live site.
