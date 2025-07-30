# FAGRI DIGITAL - Website Deployment Package 1

## Übersicht
Dieses Paket enthält die Kern-Website-Struktur für FAGRI.Digital mit professionellem Banking-Design, mehrsprachiger Unterstützung (Italienisch/Englisch) und dynamischer Navigation mit Logo-Wechsel.

## Enthaltene Features
- ✅ Responsive Navigation mit Logo-Wechsel (Weiß/Grün)
- ✅ Startseite mit Hero-Bereich und Kern-Sektionen
- ✅ EUFD2025-001 Standard Seite
- ✅ Plattform-Informationen
- ✅ Sicherheits-Seite
- ✅ CO₂ Zertifizierungs-Seite
- ✅ Kontakt-Seite
- ✅ Vollständige Mehrsprachigkeit (IT/EN)
- ✅ Banking-Style Professional Design

## Benötigte Dateien

### 1. Logos
- `FAGRI-White_1753868982629.png` - Weißes Logo für dunklen Hintergrund
- `FAGRI (1)_1753869083945.png` - Grünes Logo für weißen Hintergrund

### 2. Kern-Dateien
```
client/src/SimpleApp.tsx
client/src/components/simple-navigation.tsx
client/src/components/language-provider.tsx
client/src/lib/translations.ts
client/src/pages/simple-home.tsx
client/src/pages/simple-eufd-standard.tsx
client/src/pages/simple-platform.tsx
client/src/pages/simple-security.tsx
client/src/pages/simple-co2-certification.tsx
client/src/pages/simple-contact.tsx
```

## Installation & Deployment

### Schritt 1: Projekt Setup
```bash
npm install
```

### Schritt 2: Assets hinzufügen
1. Kopiere beide Logo-Dateien in den `attached_assets/` Ordner
2. Stelle sicher, dass die Pfade korrekt sind:
   - `@assets/FAGRI-White_1753868982629.png`
   - `@assets/FAGRI (1)_1753869083945.png`

### Schritt 3: Hauptdatei anpassen
In `client/src/main.tsx` den Import ändern:
```tsx
import SimpleApp from './SimpleApp';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>
);
```

### Schritt 4: Development Server starten
```bash
npm run dev
```

### Schritt 5: Production Build
```bash
npm run build
```

## Hosting Anforderungen
- **WICHTIG**: Europäisches Hosting (Schweiz/Deutschland/Italien) erforderlich
- Node.js 18+ Support
- SSL-Zertifikat für HTTPS
- Domain-Konfiguration für fagri.digital

## Funktionalitäten

### Navigation
- Dynamischer Hintergrund (transparent → weiß beim Scrollen)
- Automatischer Logo-Wechsel (weiß → grün)
- Responsive Mobile-Menü
- Sprach-Umschaltung (IT/EN)

### Seiten-Struktur
1. **Home (/)** - Hauptseite mit Hero und Kern-Sektionen
2. **EUFD Standard (/eufd-standard)** - Detaillierte Standard-Informationen
3. **Platform (/platform)** - Plattform-Features und -Vorteile
4. **Security (/security)** - Sicherheits-Architektur und -Details
5. **CO₂ Certification (/co2-certification)** - Zertifizierungs-Prozess
6. **Contact (/contact)** - Kontakt-Formular und Informationen

### Design-Prinzipien
- Banking-Style Professional Design
- Emerald/Grün Akzentfarben
- Minimalistisches Layout
- Optimierte Lesbarkeit
- Mobile-First Responsive Design

## Nächste Schritte
Nach erfolgreichem Deployment von Package 1:
- Package 2: Erweiterte Authentifizierung
- Package 3: Dashboard und Projektmanagement
- Package 4: CO₂ Kalkulator und Zertifizierung

## Support
Bei Problemen während des Deployments:
- Logs überprüfen: `npm run dev`
- Browser-Konsole für Frontend-Fehler
- Sicherstellen, dass alle Assets korrekt geladen werden