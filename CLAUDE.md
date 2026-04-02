# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for **2027 IEEE International Conference on Nano/Micro Engineered and Molecular Systems (IEEE NEMS 2027)**.

- **Venue:** National Tsing Hua University (NTHU), Hsinchu, Taiwan
- **Conference Hall:** International Conference Hall, Macronix Building (旺宏館)

### Reference Sites
- https://ieee-nems.org/2022/
- https://www.ieee-nems2024.org (primary style reference)

## Tech Stack

- Pure HTML / CSS / JavaScript (static site, no framework)
- Fonts: Nunito (headings/nav) + Roboto (body) via Google Fonts
- Icons: Font Awesome 6
- Style follows IEEE NEMS 2024 purple theme (`#6300E2` primary, `#E2498A` hover)

## Project Structure

- `index.html` — homepage
- `pages/` — all subpages (welcome, committees, call-for-papers, venue, etc.)
- `assets/css/style.css` — main stylesheet with CSS variables
- `assets/js/main.js` — navigation toggle, accordions, page highlight
- `assets/images/` — banner, speaker photos, sponsor logos

## Design Rules

- Follow IEEE NEMS 2024 visual style: purple headings with 3px bottom border, 1000px max content width
- All website-facing content must be in **English**
- Code comments and developer communication in **Traditional Chinese (繁體中文)**
- Header/footer/nav are duplicated in each HTML file (no build tool)

## Language Policy

- All website-facing content (pages, headings, menus) must be in **English**
- Code comments and developer communication in **Traditional Chinese (繁體中文)**
