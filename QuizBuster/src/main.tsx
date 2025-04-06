// React-Komponente, die zusätzliche Prüfungen im Entwicklungsmodus aktiviert
import { StrictMode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// React-Funktion, um die Anwendung in das HTML-Dokument einzubetten
import { createRoot } from 'react-dom/client';

// Globale CSS-Datei, die beim Start geladen wird
import './index.css';

// Die Hauptkomponente der Anwendung (App)
import App from './App.tsx';

// Erstelle einen React-Root in dem HTML-Element mit der ID 'root'
// Dies ist der Startpunkt der gesamten React-App
createRoot(document.getElementById('root')!).render(
    // StrictMode hilft dabei, mögliche Probleme frühzeitig zu erkennen
    <StrictMode>
        <App />
    </StrictMode>,
);
