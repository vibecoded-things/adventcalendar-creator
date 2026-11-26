"use strict";
const LS_SET="acal.settings", LS_ARR="acal.arrangement";
const LANGS=["en","de","fr","es","it","nl"];
const MAX_DOORS=200;
const I18N={
en:{
  appTitle:"Adventskalender Arranger",printOpened:"print opened",print:"Print",exportPdf:"Export PDF",exporting:"Exporting…",
  exportJson:"Export JSON",importJson:"Import JSON",
  libTitle:"Image Library",enableAll:"enable all",showDisabled:"show disabled",enableAllBtn:"Enable all",disableAllBtn:"Disable all",
  addImages:"Add custom images",dropHint:"Custom images can be dragged into doors and are included in PDF export when readable.",
  modeDoors:"Doors",modeImages:"Images",images:"Images",settings:"Settings",doors:"Doors",startNo:"Start no.",columns:"Columns",autoFit:"Auto-fit",
  shuffle:"Shuffle",sortFile:"Sort: filename",sortSet:"Sort: set",reverse:"Reverse",resetArr:"Reset arrangement",openAll:"Open all",closeAll:"Close all",
  appearance:"Appearance",titleText:"Title text",showTitle:"show title",showNumbers:"show numbers",doorSize:"Door size (px)",gapPx:"Gap (px)",
  cornerRadius:"Corner radius (px)",numFontSize:"Number font size (px)",numPos:"Number position",posTl:"Top left",posTr:"Top right",
  posBl:"Bottom left",posBr:"Bottom right",posC:"Center",doorBg:"Door background",textColor:"Number / text color",borderW:"Border width (px)",
  borderColor:"Border color",pageBg:"Page background",
  frontSection:"Front image",frontUpload:"Upload front",frontClear:"Clear",frontOpacity:"Front opacity",frontFit:"Front fit",
  fitCover:"Cover",fitContain:"Contain",coverPage:"Cover page (print/PDF)",save:"Save",resetSettings:"Reset settings",
  ctxOpen:"Open door",ctxClose:"Close door",ctxRemove:"Remove image",ctxRandom:"Random image",ctxRotate:"Rotate image 90°",
  ctxFlip:"Flip horizontally",ctxEditNum:"Edit number",ctxLock:"Lock door",ctxUnlock:"Unlock door",ctxAssignFront:"Assign front image",
  ctxClearFront:"Clear front image",ctxDisable:"Disable image",ctxEnable:"Enable image",ctxDeleteLib:"Delete from library",
  ctxAddDoorHere:"+ Add door here",ctxDeleteDoor:"Delete door",ctxAddFirstFree:"Add to first free door",ctxAssignFrontDoor:"Assign as front image for door…",ctxToggleEnable:"Toggle enabled",
  mConfirm:"OK",mCancel:"Cancel",mSave:"Save",mDelTitle:"Delete image",mDelBody:"Really delete this image from the library?",
  mNumTitle:"Edit number",mNumLabel:"Custom label (empty = default)",mPickDoor:"Choose a door",mPickImg:"Choose an image",
  tSaved:"Settings saved",defTitle:"Advent Calendar",gridX:"Columns",gridY:"Rows",addDoor:"+ Door",removeDoor:"− Door",tDoorsNow:"{a} doors now",tDoorMax:"Maximum doors reached",tDoorMin:"At least one door is needed",langChanged:"Language changed",tAllOpen:"All doors opened",tAllClosed:"All doors closed",tResetSet:"Settings reset to defaults",tPdfOk:"PDF exported",tPdfNoLib:"PDF library unavailable, opening print dialog",
  tJsonOk:"Arrangement exported",tImportOk:"Arrangement imported",tImportFail:"Import failed: invalid JSON",
  tCustomAdded:"Custom images added",tUploadFail:"Upload failed",tBackendWarn:"Backend unreachable, custom images are local only",
  tDeleted:"Deleted from library",tImgRemoved:"Image removed",tLocked:"Door locked",tUnlocked:"Door unlocked",tNumSaved:"Number saved",
  tFrontSet:"Front image set",tFrontCleared:"Front image cleared",tAddedDoor:"Added to door",tNoFreeDoor:"No free door",
  tArrReset:"Arrangement reset",tLibFail:"Image library could not be loaded. Check that images/manifest.json is available next to index.html.",
  tNothingEnabled:"No images enabled",tUploading:"Uploading {a} / {b} …",tCount:"{e} of {t} images enabled · {d} doors"
},
de:{
  appTitle:"Adventskalender Arranger",printOpened:"geöffnete drucken",print:"Drucken",exportPdf:"PDF exportieren",exporting:"Exportiere…",
  exportJson:"JSON exportieren",importJson:"JSON importieren",
  libTitle:"Bildbibliothek",enableAll:"alle aktivieren",showDisabled:"deaktivierte zeigen",enableAllBtn:"Alle aktivieren",disableAllBtn:"Alle deaktivieren",
  addImages:"Eigene Bilder hinzufügen",dropHint:"Eigene Bilder können in Türen gezogen werden und sind im PDF-Export enthalten, wenn lesbar.",
  modeDoors:"Türen",modeImages:"Bilder",images:"Bilder",settings:"Einstellungen",doors:"Türen",startNo:"Start-Nr.",columns:"Spalten",autoFit:"Automatisch",
  shuffle:"Mischen",sortFile:"Sortierung: Datei",sortSet:"Sortierung: Satz",reverse:"Umkehren",resetArr:"Anordnung zurücksetzen",openAll:"Alle öffnen",closeAll:"Alle schließen",
  appearance:"Darstellung",titleText:"Titeltext",showTitle:"Titel anzeigen",showNumbers:"Nummern anzeigen",doorSize:"Türgröße (px)",gapPx:"Abstand (px)",
  cornerRadius:"Eckenradius (px)",numFontSize:"Schriftgröße (px)",numPos:"Nummernposition",posTl:"Oben links",posTr:"Oben rechts",
  posBl:"Unten links",posBr:"Unten rechts",posC:"Mitte",doorBg:"Türhintergrund",textColor:"Textfarbe",borderW:"Rahmenbreite (px)",
  borderColor:"Rahmenfarbe",pageBg:"Seitenhintergrund",
  frontSection:"Vorderseitenbild",frontUpload:"Vorderbild laden",frontClear:"Entfernen",frontOpacity:"Deckkraft",frontFit:"Passform",
  fitCover:"Füllen",fitContain:"Einpassen",coverPage:"Deckblatt (Druck/PDF)",save:"Speichern",resetSettings:"Einstellungen zurücksetzen",
  ctxOpen:"Tür öffnen",ctxClose:"Tür schließen",ctxRemove:"Bild entfernen",ctxRandom:"Zufälliges Bild",ctxRotate:"Bild 90° drehen",
  ctxFlip:"Horizontal spiegeln",ctxEditNum:"Nummer bearbeiten",ctxLock:"Tür fixieren",ctxUnlock:"Tür lösen",ctxAssignFront:"Vorderbild zuweisen",
  ctxClearFront:"Vorderbild entfernen",ctxDisable:"Bild deaktivieren",ctxEnable:"Bild aktivieren",ctxDeleteLib:"Aus Bibliothek löschen",
  ctxAddDoorHere:"+ Tür hier einfügen",ctxDeleteDoor:"Tür löschen",ctxAddFirstFree:"In erstes freies Türfeld",ctxAssignFrontDoor:"Als Vorderbild für Tür…",ctxToggleEnable:"Aktivierung umschalten",
  mConfirm:"OK",mCancel:"Abbrechen",mSave:"Speichern",mDelTitle:"Bild löschen",mDelBody:"Dieses Bild wirklich aus der Bibliothek löschen?",
  mNumTitle:"Nummer bearbeiten",mNumLabel:"Eigenes Label (leer = Standard)",mPickDoor:"Tür wählen",mPickImg:"Bild wählen",
  tSaved:"Einstellungen gespeichert",defTitle:"Adventskalender",gridX:"Spalten",gridY:"Reihen",addDoor:"+ Tür",removeDoor:"− Tür",tDoorsNow:"Jetzt {a} Türen",tDoorMax:"Maximale Türanzahl erreicht",tDoorMin:"Mindestens eine Tür wird benötigt",langChanged:"Sprache geändert",tAllOpen:"Alle Türen geöffnet",tAllClosed:"Alle Türen geschlossen",tResetSet:"Einstellungen zurückgesetzt",tPdfOk:"PDF exportiert",tPdfNoLib:"PDF-Bibliothek nicht verfügbar, Drucken wird geöffnet",
  tJsonOk:"Anordnung exportiert",tImportOk:"Anordnung importiert",tImportFail:"Import fehlgeschlagen: ungültiges JSON",
  tCustomAdded:"Eigene Bilder hinzugefügt",tUploadFail:"Upload fehlgeschlagen",tBackendWarn:"Server nicht erreichbar, eigene Bilder nur lokal",
  tDeleted:"Aus Bibliothek gelöscht",tImgRemoved:"Bild entfernt",tLocked:"Tür fixiert",tUnlocked:"Tür gelöst",tNumSaved:"Nummer gespeichert",
  tFrontSet:"Vorderbild gesetzt",tFrontCleared:"Vorderbild entfernt",tAddedDoor:"Zum Türfeld hinzugefügt",tNoFreeDoor:"Kein freies Türfeld",
  tArrReset:"Anordnung zurückgesetzt",tLibFail:"Bildbibliothek konnte nicht geladen werden. Prüfe, ob images/manifest.json neben index.html liegt.",
  tNothingEnabled:"Keine Bilder aktiviert",tUploading:"Lade hoch {a} / {b} …",tCount:"{e} von {t} Bildern aktiv · {d} Türen"
},
fr:{
  appTitle:"Adventskalender Arranger",printOpened:"imprimer les ouverts",print:"Imprimer",exportPdf:"Exporter en PDF",exporting:"Export en cours…",
  exportJson:"Exporter JSON",importJson:"Importer JSON",
  libTitle:"Bibliothèque d'images",enableAll:"tout activer",showDisabled:"afficher les désactivées",enableAllBtn:"Tout activer",disableAllBtn:"Tout désactiver",
  addImages:"Ajouter des images",dropHint:"Les images personnalisées peuvent être glissées dans les portes et sont incluses dans l'export PDF si lisibles.",
  modeDoors:"Portes",modeImages:"Images",images:"Images",settings:"Réglages",doors:"Portes",startNo:"N° de départ",columns:"Colonnes",autoFit:"Auto",
  shuffle:"Mélanger",sortFile:"Tri : fichier",sortSet:"Tri : série",reverse:"Inverser",resetArr:"Réinitialiser",openAll:"Tout ouvrir",closeAll:"Tout fermer",
  appearance:"Apparence",titleText:"Titre",showTitle:"afficher le titre",showNumbers:"afficher les numéros",doorSize:"Taille des portes (px)",gapPx:"Écart (px)",
  cornerRadius:"Rayon des coins (px)",numFontSize:"Taille de police (px)",numPos:"Position du numéro",posTl:"Haut gauche",posTr:"Haut droit",
  posBl:"Bas gauche",posBr:"Bas droit",posC:"Centre",doorBg:"Fond de porte",textColor:"Couleur du texte",borderW:"Épaisseur du bord (px)",
  borderColor:"Couleur du bord",pageBg:"Fond de page",
  frontSection:"Image de face",frontUpload:"Importer une face",frontClear:"Retirer",frontOpacity:"Opacité",frontFit:"Ajustement",
  fitCover:"Remplir",fitContain:"Contain",coverPage:"Page de couverture (impression/PDF)",save:"Enregistrer",resetSettings:"Réinitialiser",
  ctxOpen:"Ouvrir la porte",ctxClose:"Fermer la porte",ctxRemove:"Retirer l'image",ctxRandom:"Image aléatoire",ctxRotate:"Pivoter 90°",
  ctxFlip:"Miroir horizontal",ctxEditNum:"Modifier le numéro",ctxLock:"Verrouiller la porte",ctxUnlock:"Déverrouiller",ctxAssignFront:"Définir l'image de face",
  ctxClearFront:"Retirer l'image de face",ctxDisable:"Désactiver l'image",ctxEnable:"Activer l'image",ctxDeleteLib:"Supprimer de la bibliothèque",
  ctxAddDoorHere:"+ Ajouter une porte ici",ctxDeleteDoor:"Supprimer la porte",ctxAddFirstFree:"Ajouter à la première porte libre",ctxAssignFrontDoor:"Définir comme face de la porte…",ctxToggleEnable:"Basculer l'activation",
  mConfirm:"OK",mCancel:"Annuler",mSave:"Enregistrer",mDelTitle:"Supprimer l'image",mDelBody:"Supprimer vraiment cette image de la bibliothèque ?",
  mNumTitle:"Modifier le numéro",mNumLabel:"Label personnalisé (vide = défaut)",mPickDoor:"Choisir une porte",mPickImg:"Choisir une image",
  tSaved:"Réglages enregistrés",defTitle:"Calendrier de l'Avent",gridX:"Colonnes",gridY:"Rangées",addDoor:"+ Porte",removeDoor:"− Porte",tDoorsNow:"{a} portes maintenant",tDoorMax:"Nombre maximum de portes atteint",tDoorMin:"Au moins une porte est nécessaire",langChanged:"Langue modifiée",tAllOpen:"Toutes les portes ouvertes",tAllClosed:"Toutes les portes fermées",tResetSet:"Réglages réinitialisés",tPdfOk:"PDF exporté",tPdfNoLib:"Bibliothèque PDF indisponible, impression ouverte",
  tJsonOk:"Disposition exportée",tImportOk:"Disposition importée",tImportFail:"Échec de l'import : JSON invalide",
  tCustomAdded:"Images ajoutées",tUploadFail:"Échec de l'envoi",tBackendWarn:"Serveur injoignable, images locales uniquement",
  tDeleted:"Supprimé de la bibliothèque",tImgRemoved:"Image retirée",tLocked:"Porte verrouillée",tUnlocked:"Porte déverrouillée",tNumSaved:"Numéro enregistré",
  tFrontSet:"Image de face définie",tFrontCleared:"Image de face retirée",tAddedDoor:"Ajouté à la porte",tNoFreeDoor:"Aucune porte libre",
  tArrReset:"Disposition réinitialisée",tLibFail:"Impossible de charger la bibliothèque. Vérifiez que images/manifest.json est présent.",
  tNothingEnabled:"Aucune image activée",tUploading:"Envoi {a} / {b} …",tCount:"{e} sur {t} images activées · {d} portes"
},
es:{
  appTitle:"Adventskalender Arranger",printOpened:"imprimir abiertas",print:"Imprimir",exportPdf:"Exportar PDF",exporting:"Exportando…",
  exportJson:"Exportar JSON",importJson:"Importar JSON",
  libTitle:"Biblioteca de imágenes",enableAll:"activar todas",showDisabled:"mostrar desactivadas",enableAllBtn:"Activar todas",disableAllBtn:"Desactivar todas",
  addImages:"Añadir imágenes propias",dropHint:"Las imágenes propias se pueden arrastrar a las puertas y se incluyen en el PDF si se pueden leer.",
  modeDoors:"Puertas",modeImages:"Imágenes",images:"Imágenes",settings:"Ajustes",doors:"Puertas",startNo:"N.º inicial",columns:"Columnas",autoFit:"Auto",
  shuffle:"Mezclar",sortFile:"Orden: archivo",sortSet:"Orden: serie",reverse:"Invertir",resetArr:"Restablecer disposición",openAll:"Abrir todas",closeAll:"Cerrar todas",
  appearance:"Apariencia",titleText:"Título",showTitle:"mostrar título",showNumbers:"mostrar números",doorSize:"Tamaño de puerta (px)",gapPx:"Espacio (px)",
  cornerRadius:"Radio de esquinas (px)",numFontSize:"Tamaño de fuente (px)",numPos:"Posición del número",posTl:"Arriba izq.",posTr:"Arriba der.",
  posBl:"Abajo izq.",posBr:"Abajo der.",posC:"Centro",doorBg:"Fondo de puerta",textColor:"Color del texto",borderW:"Grosor del borde (px)",
  borderColor:"Color del borde",pageBg:"Fondo de página",
  frontSection:"Imagen frontal",frontUpload:"Subir frontal",frontClear:"Quitar",frontOpacity:"Opacidad",frontFit:"Ajuste",
  fitCover:"Cubrir",fitContain:"Contener",coverPage:"Portada (imprimir/PDF)",save:"Guardar",resetSettings:"Restablecer ajustes",
  ctxOpen:"Abrir puerta",ctxClose:"Cerrar puerta",ctxRemove:"Quitar imagen",ctxRandom:"Imagen aleatoria",ctxRotate:"Rotar 90°",
  ctxFlip:"Voltear horizontalmente",ctxEditNum:"Editar número",ctxLock:"Bloquear puerta",ctxUnlock:"Desbloquear puerta",ctxAssignFront:"Asignar imagen frontal",
  ctxClearFront:"Quitar imagen frontal",ctxDisable:"Desactivar imagen",ctxEnable:"Activar imagen",ctxDeleteLib:"Eliminar de la biblioteca",
  ctxAddDoorHere:"+ Añadir puerta aquí",ctxDeleteDoor:"Eliminar puerta",ctxAddFirstFree:"Añadir a la primera puerta libre",ctxAssignFrontDoor:"Asignar como frontal de la puerta…",ctxToggleEnable:"Alternar activación",
  mConfirm:"OK",mCancel:"Cancelar",mSave:"Guardar",mDelTitle:"Eliminar imagen",mDelBody:"¿Eliminar realmente esta imagen de la biblioteca?",
  mNumTitle:"Editar número",mNumLabel:"Etiqueta personalizada (vacío = por defecto)",mPickDoor:"Elegir puerta",mPickImg:"Elegir imagen",
  tSaved:"Ajustes guardados",defTitle:"Calendario de Adviento",gridX:"Columnas",gridY:"Filas",addDoor:"+ Puerta",removeDoor:"− Puerta",tDoorsNow:"{a} puertas ahora",tDoorMax:"Número máximo de puertas alcanzado",tDoorMin:"Se necesita al menos una puerta",langChanged:"Idioma cambiado",tAllOpen:"Todas las puertas abiertas",tAllClosed:"Todas las puertas cerradas",tResetSet:"Ajustes restablecidos",tPdfOk:"PDF exportado",tPdfNoLib:"Biblioteca PDF no disponible, abriendo diálogo de impresión",
  tJsonOk:"Disposición exportada",tImportOk:"Disposición importada",tImportFail:"Importación fallida: JSON no válido",
  tCustomAdded:"Imágenes añadidas",tUploadFail:"Error al subir",tBackendWarn:"Servidor inaccesible, imágenes solo locales",
  tDeleted:"Eliminada de la biblioteca",tImgRemoved:"Imagen quitada",tLocked:"Puerta bloqueada",tUnlocked:"Puerta desbloqueada",tNumSaved:"Número guardado",
  tFrontSet:"Imagen frontal asignada",tFrontCleared:"Imagen frontal quitada",tAddedDoor:"Añadida a la puerta",tNoFreeDoor:"No hay puerta libre",
  tArrReset:"Disposición restablecida",tLibFail:"No se pudo cargar la biblioteca. Comprueba que images/manifest.json esté disponible.",
  tNothingEnabled:"No hay imágenes activadas",tUploading:"Subiendo {a} / {b} …",tCount:"{e} de {t} imágenes activadas · {d} puertas"
},
it:{
  appTitle:"Adventskalender Arranger",printOpened:"stampa aperte",print:"Stampa",exportPdf:"Esporta PDF",exporting:"Esportazione…",
  exportJson:"Esporta JSON",importJson:"Importa JSON",
  libTitle:"Libreria immagini",enableAll:"attiva tutte",showDisabled:"mostra disattivate",enableAllBtn:"Attiva tutte",disableAllBtn:"Disattiva tutte",
  addImages:"Aggiungi immagini",dropHint:"Le immagini personalizzate possono essere trascinate negli sportelli e incluse nel PDF se leggibili.",
  modeDoors:"Sportelli",modeImages:"Immagini",images:"Immagini",settings:"Impostazioni",doors:"Sportelli",startNo:"N. iniziale",columns:"Colonne",autoFit:"Auto",
  shuffle:"Mescola",sortFile:"Ordina: file",sortSet:"Ordina: serie",reverse:"Inverti",resetArr:"Reimposta disposizione",openAll:"Apri tutte",closeAll:"Chiudi tutte",
  appearance:"Aspetto",titleText:"Titolo",showTitle:"mostra titolo",showNumbers:"mostra numeri",doorSize:"Dimensione sportello (px)",gapPx:"Spaziatura (px)",
  cornerRadius:"Raggio angoli (px)",numFontSize:"Dimensione font (px)",numPos:"Posizione numero",posTl:"Alto sinistra",posTr:"Alto destra",
  posBl:"Basso sinistra",posBr:"Basso destra",posC:"Centro",doorBg:"Sfondo sportello",textColor:"Colore testo",borderW:"Spessore bordo (px)",
  borderColor:"Colore bordo",pageBg:"Sfondo pagina",
  frontSection:"Immagine frontale",frontUpload:"Carica frontale",frontClear:"Rimuovi",frontOpacity:"Opacità",frontFit:"Adattamento",
  fitCover:"Copri",fitContain:"Contieni",coverPage:"Copertina (stampa/PDF)",save:"Salva",resetSettings:"Reimposta impostazioni",
  ctxOpen:"Apri sportello",ctxClose:"Chiudi sportello",ctxRemove:"Rimuovi immagine",ctxRandom:"Immagine casuale",ctxRotate:"Ruota di 90°",
  ctxFlip:"Capovolgi orizzontale",ctxEditNum:"Modifica numero",ctxLock:"Blocca sportello",ctxUnlock:"Sblocca sportello",ctxAssignFront:"Assegna immagine frontale",
  ctxClearFront:"Rimuovi immagine frontale",ctxDisable:"Disattiva immagine",ctxEnable:"Attiva immagine",ctxDeleteLib:"Elimina dalla libreria",
  ctxAddDoorHere:"+ Aggiungi sportello qui",ctxDeleteDoor:"Elimina sportello",ctxAddFirstFree:"Aggiungi al primo sportello libero",ctxAssignFrontDoor:"Assegna come frontale dello sportello…",ctxToggleEnable:"Attiva/disattiva",
  mConfirm:"OK",mCancel:"Annulla",mSave:"Salva",mDelTitle:"Elimina immagine",mDelBody:"Eliminare davvero questa immagine dalla libreria?",
  mNumTitle:"Modifica numero",mNumLabel:"Etichetta personalizzata (vuoto = predefinito)",mPickDoor:"Scegli sportello",mPickImg:"Scegli immagine",
  tSaved:"Impostazioni salvate",defTitle:"Calendario dell'Avvento",gridX:"Colonne",gridY:"Righe",addDoor:"+ Sportello",removeDoor:"− Sportello",tDoorsNow:"{a} sportelli adesso",tDoorMax:"Numero massimo di sportelli raggiunto",tDoorMin:"È necessario almeno uno sportello",langChanged:"Lingua cambiata",tAllOpen:"Tutti gli sportelli aperti",tAllClosed:"Tutti gli sportelli chiusi",tResetSet:"Impostazioni reimpostate",tPdfOk:"PDF esportato",tPdfNoLib:"Libreria PDF non disponibile, apro la stampa",
  tJsonOk:"Disposizione esportata",tImportOk:"Disposizione importata",tImportFail:"Importazione non riuscita: JSON non valido",
  tCustomAdded:"Immagini aggiunte",tUploadFail:"Caricamento non riuscito",tBackendWarn:"Server non raggiungibile, immagini solo locali",
  tDeleted:"Eliminata dalla libreria",tImgRemoved:"Immagine rimossa",tLocked:"Sportello bloccato",tUnlocked:"Sportello sbloccato",tNumSaved:"Numero salvato",
  tFrontSet:"Immagine frontale impostata",tFrontCleared:"Immagine frontale rimossa",tAddedDoor:"Aggiunta allo sportello",tNoFreeDoor:"Nessuno sportello libero",
  tArrReset:"Disposizione reimpostata",tLibFail:"Impossibile caricare la libreria. Verifica che images/manifest.json sia presente.",
  tNothingEnabled:"Nessuna immagine attivata",tUploading:"Caricamento {a} / {b} …",tCount:"{e} di {t} immagini attivate · {d} sportelli"
},
nl:{
  appTitle:"Adventskalender Arranger",printOpened:"geopenden printen",print:"Printen",exportPdf:"PDF exporteren",exporting:"Exporteren…",
  exportJson:"JSON exporteren",importJson:"JSON importeren",
  libTitle:"Afbeeldingenbibliotheek",enableAll:"alles inschakelen",showDisabled:"uitgeschakelde tonen",enableAllBtn:"Alles inschakelen",disableAllBtn:"Alles uitschakelen",
  addImages:"Eigen afbeeldingen toevoegen",dropHint:"Eigen afbeeldingen kunnen in deuren gesleept worden en zitten in de PDF-export als ze leesbaar zijn.",
  modeDoors:"Deuren",modeImages:"Afbeeldingen",images:"Afbeeldingen",settings:"Instellingen",doors:"Deuren",startNo:"Startnummer",columns:"Kolommen",autoFit:"Auto",
  shuffle:"Schudden",sortFile:"Sorteren: bestand",sortSet:"Sorteren: set",reverse:"Omkeren",resetArr:"Indeling herstellen",openAll:"Alles openen",closeAll:"Alles sluiten",
  appearance:"Weergave",titleText:"Titel",showTitle:"titel tonen",showNumbers:"nummers tonen",doorSize:"Deurgrootte (px)",gapPx:"Tussenruimte (px)",
  cornerRadius:"Hoekradius (px)",numFontSize:"Lettergrootte (px)",numPos:"Nummerpositie",posTl:"Linksboven",posTr:"Rechtsboven",
  posBl:"Linksonder",posBr:"Rechtsonder",posC:"Midden",doorBg:"Deurachtergrond",textColor:"Tekstkleur",borderW:"Randbreedte (px)",
  borderColor:"Randkleur",pageBg:"Pagina-achtergrond",
  frontSection:"Voorzijde-afbeelding",frontUpload:"Voorzijde uploaden",frontClear:"Wissen",frontOpacity:"Dekking",frontFit:"Passing",
  fitCover:"Vullen",fitContain:"Passen",coverPage:"Omslagpagina (print/PDF)",save:"Opslaan",resetSettings:"Instellingen herstellen",
  ctxOpen:"Deur openen",ctxClose:"Deur sluiten",ctxRemove:"Afbeelding verwijderen",ctxRandom:"Willekeurige afbeelding",ctxRotate:"90° draaien",
  ctxFlip:"Horizontaal spiegelen",ctxEditNum:"Nummer bewerken",ctxLock:"Deur vergrendelen",ctxUnlock:"Deur ontgrendelen",ctxAssignFront:"Voorzijde toewijzen",
  ctxClearFront:"Voorzijde wissen",ctxDisable:"Afbeelding uitschakelen",ctxEnable:"Afbeelding inschakelen",ctxDeleteLib:"Uit bibliotheek verwijderen",
  ctxAddDoorHere:"+ Deur hier toevoegen",ctxDeleteDoor:"Deur verwijderen",ctxAddFirstFree:"Naar eerste vrije deur",ctxAssignFrontDoor:"Als voorzijde voor deur…",ctxToggleEnable:"Inschakelen wisselen",
  mConfirm:"OK",mCancel:"Annuleren",mSave:"Opslaan",mDelTitle:"Afbeelding verwijderen",mDelBody:"Deze afbeelding echt uit de bibliotheek verwijderen?",
  mNumTitle:"Nummer bewerken",mNumLabel:"Eigen label (leeg = standaard)",mPickDoor:"Kies een deur",mPickImg:"Kies een afbeelding",
  tSaved:"Instellingen opgeslagen",defTitle:"Adventskalender",gridX:"Kolommen",gridY:"Rijen",addDoor:"+ Deur",removeDoor:"− Deur",tDoorsNow:"Nu {a} deuren",tDoorMax:"Maximaal aantal deuren bereikt",tDoorMin:"Er is minstens één deur nodig",langChanged:"Taal gewijzigd",tAllOpen:"Alle deuren geopend",tAllClosed:"Alle deuren gesloten",tResetSet:"Instellingen hersteld",tPdfOk:"PDF geëxporteerd",tPdfNoLib:"PDF-bibliotheek niet beschikbaar, afdrukvenster wordt geopend",
  tJsonOk:"Indeling geëxporteerd",tImportOk:"Indeling geïmporteerd",tImportFail:"Import mislukt: ongeldige JSON",
  tCustomAdded:"Afbeeldingen toegevoegd",tUploadFail:"Upload mislukt",tBackendWarn:"Server niet bereikbaar, afbeeldingen alleen lokaal",
  tDeleted:"Uit bibliotheek verwijderd",tImgRemoved:"Afbeelding verwijderd",tLocked:"Deur vergrendeld",tUnlocked:"Deur ontgrendeld",tNumSaved:"Nummer opgeslagen",
  tFrontSet:"Voorzijde ingesteld",tFrontCleared:"Voorzijde gewist",tAddedDoor:"Aan deur toegevoegd",tNoFreeDoor:"Geen vrije deur",
  tArrReset:"Indeling hersteld",tLibFail:"Bibliotheek kon niet geladen worden. Controleer of images/manifest.json beschikbaar is.",
  tNothingEnabled:"Geen afbeeldingen ingeschakeld",tUploading:"Uploaden {a} / {b} …",tCount:"{e} van {t} afbeeldingen ingeschakeld · {d} deuren"
}
};
const DEFAULTS={
  doorSize:110,gap:12,radius:12,doorBg:"#c62b3a",textColor:"#ffffff",
  numSize:16,showNums:true,numPos:"tl",borderW:2,borderColor:"#7a1c28",
  pageBg:"#f7f1e6",title:"Adventskalender",titleShow:true,
  mode:"doors",lang:"en",
  front:{id:null,src:null,opacity:.5,fit:"cover",coverPage:false}
};
let settings=JSON.parse(JSON.stringify(DEFAULTS));
settings.lang=(()=>{const nav=(navigator.language||"en").slice(0,2).toLowerCase();return LANGS.includes(nav)?nav:"en";})();
let images=[];
let enabled=new Set();
let arrangement=new Array(MAX_DOORS).fill(null);
let overrides={};
let openDoors=new Set();
let activeFilter="all";
let customCounter=0;
let backend=false;
let showDisabled=false;
let animateNext=false;
let gridExtra=0;
const $=s=>document.querySelector(s);
const grid=$("#grid"), libList=$("#libList"), ctx=$("#ctxMenu"), mw=$("#modalWrap"), mb=$("#modalBox");
function getGridCols(){return Math.max(1,Math.min(52,+($("#gridCols")&&$("#gridCols").value)||6));}
function getGridRows(){return Math.max(1,Math.min(52,+($("#gridRows")&&$("#gridRows").value)||4));}
function doorCountVal(){return Math.max(1,Math.min(MAX_DOORS,getGridCols()*getGridRows()+gridExtra));}
let modalResolve=null;
function t(k){
  const d=I18N[settings.lang]||I18N.en;
  return d[k]!==undefined?d[k]:(I18N.en[k]!==undefined?I18N.en[k]:k);
}
function tf(k,obj){
  let s=t(k);
  for(const key in obj)s=s.split("{"+key+"}").join(obj[key]);
  return s;
}
function toast(msg,type){
  const el=$("#toast");
  el.textContent=msg;
  el.className="show "+(type||"info");
  clearTimeout(el._h);
  el._h=setTimeout(()=>el.classList.remove("show"),2400);
}
function flashSuccess(btn){
  btn.classList.add("flash-success");
  setTimeout(()=>btn.classList.remove("flash-success"),1400);
}
function syncLangDD(){
  const langMenu=$("#langMenu");
  const cur=langMenu.querySelector("li[data-lang='"+settings.lang+"']");
  $("#langCur").textContent=cur?cur.textContent:settings.lang.toUpperCase();
  langMenu.querySelectorAll("li").forEach(li=>li.setAttribute("aria-selected",li.dataset.lang===settings.lang?"true":"false"));
}
function syncTitleLang(){
  const known=LANGS.map(l=>I18N[l].defTitle);
  if(!settings.title||known.includes(settings.title))settings.title=I18N[settings.lang].defTitle;
}
function applyI18n(){
  document.documentElement.lang=settings.lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n);});
  syncLangDD();
  updateCounts();
}
function saveSettings(){localStorage.setItem(LS_SET,JSON.stringify(settings));}
function saveArrangement(){
  localStorage.setItem(LS_ARR,JSON.stringify({
    arrangement,overrides,
    idList:images.filter(i=>!i.custom&&!i.upload).map(i=>i.id),
    gridCols:getGridCols(),
    gridRows:getGridRows(),
    gridExtra:gridExtra,
    doorCount:doorCountVal(),
    startNumber:+$("#startNumber").value||1
  }));
}
function loadSaved(){
  try{
    const s=JSON.parse(localStorage.getItem(LS_SET));
    if(s&&typeof s==="object")settings={...DEFAULTS,...s,front:{...DEFAULTS.front,...(s.front||{})}};
  }catch(e){}
  if(settings.front&&settings.front.src&&settings.front.src.startsWith("blob:")&&!settings.front.id){
    settings.front.src=null;settings.front.id=null;
  }
  try{
    const a=JSON.parse(localStorage.getItem(LS_ARR));
    if(a&&Array.isArray(a.arrangement))return a;
  }catch(e){}
  return null;
}
async function probeBackend(){
  try{
    const c=new AbortController();
    const tm=setTimeout(()=>c.abort(),2500);
    const r=await fetch("/uploads",{signal:c.signal});
    clearTimeout(tm);
    const j=await r.json();
    return !!(j&&j.ok&&Array.isArray(j.files));
  }catch(e){return false;}
}
async function loadUploads(){
  try{
    const r=await fetch("/uploads");
    const j=await r.json();
    if(j&&j.ok&&Array.isArray(j.files)){
      j.files.forEach(f=>{
        const name=f.name||f.file.split("/").pop();
        const id="up-"+name;
        if(!images.some(x=>x.id===id))images.push({id,file:f.file,set:"upload",src:f.file,upload:true});
      });
    }
  }catch(e){}
}
async function loadManifest(){
  try{
    const res=await fetch("images/manifest.json");
    if(!res.ok)throw new Error("HTTP "+res.status);
    const data=await res.json();
    if(!Array.isArray(data))throw new Error("bad manifest");
    return data.map(e=>({id:e.id||e.file,file:e.file,set:e.set||"misc",src:e.file,custom:false}));
  }catch(e){
    return null;
  }
}
function frontSrcFor(i){
  const o=overrides[i];
  if(o&&o.frontId){
    const im=images.find(x=>x.id===o.frontId);
    if(im)return im.src;
  }
  return settings.front&&settings.front.src?settings.front.src:null;
}
function doorLabel(i){
  const start=+$("#startNumber").value||1;
  const o=overrides[i];
  return (o&&o.label!==undefined&&o.label!=="")?o.label:String(start+i);
}
function updateCounts(){
  const doors=doorCountVal();
  const line=$("#countLine");
  line.textContent=tf("tCount",{e:enabled.size,t:images.length,d:doors});
  line.classList.toggle("warn",enabled.size<doors);
}
function purgeDisabled(){
  for(let i=0;i<52;i++)if(arrangement[i]&&!enabled.has(arrangement[i]))arrangement[i]=null;
}
function buildLibrary(){
  const sets=[...new Set(images.map(i=>i.set))];
  const chips=$("#setChips");chips.innerHTML="";
  ["all",...sets].forEach(s=>{
    const c=document.createElement("button");
    c.className="chip"+(activeFilter===s?" active":"");
    c.textContent=s;
    c.onclick=()=>{activeFilter=s;buildLibrary();};
    chips.appendChild(c);
  });
  libList.innerHTML="";
  images.filter(i=>(activeFilter==="all"||i.set===activeFilter)&&(showDisabled||enabled.has(i.id))).forEach(img=>{
    const dis=!enabled.has(img.id);
    const row=document.createElement("div");
    row.className="lib-item"+(dis?" disabled":"");
    row.draggable=!dis;
    row.dataset.imgId=img.id;
    const im=document.createElement("img");
    im.src=img.src;im.alt=img.id;im.draggable=false;
    const meta=document.createElement("div");meta.className="meta";
    const nm=document.createElement("div");nm.className="name";nm.textContent=img.file.split("/").pop();
    const st=document.createElement("div");st.className="set";st.textContent=img.set;
    meta.append(nm,st);
    const cb=document.createElement("input");
    cb.type="checkbox";cb.checked=enabled.has(img.id);
    cb.onchange=()=>{
      if(cb.checked)enabled.add(img.id);else{enabled.delete(img.id);purgeDisabled();}
      animateNext=false;
      buildLibrary();renderGrid();saveArrangement();
    };
    row.append(im,meta,cb);
    row.addEventListener("contextmenu",e=>{e.preventDefault();openLibMenu(e,img);});
    row.addEventListener("dragstart",e=>{
      e.dataTransfer.setData("text/plain","lib:"+img.id);
      row.classList.add("dragging");
    });
    row.addEventListener("dragend",()=>row.classList.remove("dragging"));
    libList.appendChild(row);
  });
  $("#cbEnableAll").checked=images.length>0&&images.every(i=>enabled.has(i.id));
  updateCounts();
}
function effectiveCols(){
  return getGridCols();
}
function imgTransformStyle(o){
  if(!o||(!o.rot&&!o.flip))return "";
  return "rotate("+(o.rot||0)+"deg)"+(o.flip?" scaleX(-1)":"");
}
function renderGrid(){
  updateCounts();
  if(settings.mode==="flat")renderFlat();else renderDoors();
}
function renderDoors(){
  const n=doorCountVal();
  const cols=effectiveCols();
  grid.style.gridTemplateColumns="repeat("+cols+",var(--door-size))";
  grid.style.gap=settings.gap+"px";
  grid.innerHTML="";
  for(let i=0;i<n;i++){
    const id=arrangement[i];
    const img=(id&&enabled.has(id))?images.find(x=>x.id===id):null;
    const o=overrides[i]||{};
    const d=document.createElement("div");
    d.className="door"+(openDoors.has(i)?" open":"");
    d.dataset.i=i;
    d.draggable=true;
    const empty=document.createElement("div");empty.className="door-empty";
    const inner=document.createElement("div");inner.className="door-inner";
    const back=document.createElement("div");back.className="door-img";
    if(img){
      const im=document.createElement("img");
      im.src=img.src;im.alt="";im.draggable=false;
      const tr=imgTransformStyle(o);
      if(tr)im.style.transform=tr;
      back.appendChild(im);
    }
    const face=document.createElement("div");face.className="door-face";
    const fsrc=frontSrcFor(i);
    if(fsrc){
      const fb=document.createElement("div");fb.className="face-bg";
      const fi=document.createElement("img");fi.src=fsrc;fi.draggable=false;
      fi.style.objectFit=settings.front.fit||"cover";
      fb.appendChild(fi);
      face.appendChild(fb);
    }
    if(settings.showNums){
      const num=document.createElement("span");
      num.className="num pos-"+settings.numPos;
      num.textContent=doorLabel(i);
      face.appendChild(num);
    }
    if(o.locked)face.appendChild(Object.assign(document.createElement("span"),{className:"pin"}));
    inner.append(back,face);
    d.append(empty,inner);
    d.addEventListener("click",()=>{openDoors.has(i)?openDoors.delete(i):openDoors.add(i);d.classList.toggle("open");});
    d.addEventListener("contextmenu",e=>{e.preventDefault();openDoorMenu(e,i);});
    d.addEventListener("dragstart",e=>{
      e.dataTransfer.setData("text/plain","door:"+i);
      d.classList.add("door-src");
    });
    d.addEventListener("dragend",()=>d.classList.remove("door-src"));
    d.addEventListener("dragover",e=>{e.preventDefault();d.classList.add("dragover");});
    d.addEventListener("dragleave",()=>d.classList.remove("dragover"));
    d.addEventListener("drop",e=>{
      e.preventDefault();
      d.classList.remove("dragover");
      const data=e.dataTransfer.getData("text/plain");
      if(data.startsWith("door:")){
        const src=+data.slice(5);
        if(src!==i){[arrangement[src],arrangement[i]]=[arrangement[i],arrangement[src]];}
      }else if(data.startsWith("lib:")){
        const lid=data.slice(4);
        if(enabled.has(lid))arrangement[i]=lid;
      }
      animateNext=false;
      saveArrangement();renderGrid();
    });
    if(animateNext)d.style.setProperty("--d",Math.min(i*14,400)+"ms");
    else d.style.animation="none";
    grid.appendChild(d);
  }
  animateNext=false;
  grid.appendChild(makeAddCard());
}
function makeAddCard(){
  const a=document.createElement("div");
  a.className="door-add";
  a.title=t("addDoor");
  a.setAttribute("aria-label",t("addDoor"));
  a.setAttribute("role","button");
  a.setAttribute("tabindex","0");
  const plus=document.createElement("span");
  plus.className="plus";
  plus.setAttribute("aria-hidden","true");
  a.appendChild(plus);
  const add=()=>{
    if(doorCountVal()>=MAX_DOORS){toast(t("tDoorMax"),"error");return;}
    animateNext=false;
    gridExtra++;
    saveArrangement();renderGrid();
    toast(tf("tDoorsNow",{a:doorCountVal()}),"success");
  };
  a.addEventListener("click",add);
  a.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();add();}});
  a.addEventListener("dragover",e=>e.preventDefault());
  a.addEventListener("drop",e=>{
    e.preventDefault();
    const data=e.dataTransfer.getData("text/plain");
    if(data.startsWith("door:")){
      const src=+data.slice(5);
      const target=doorCountVal();
      if(src!==target-1){arrangement[target]=arrangement[src];arrangement[src]=null;}
    }else if(data.startsWith("lib:")){
      const lid=data.slice(4);
      if(enabled.has(lid))arrangement[doorCountVal()]=lid;
    }
    animateNext=false;
    saveArrangement();renderGrid();
  });
  return a;
}
function flatSlots(){
  const n=doorCountVal();
  const slots=[];
  for(let i=0;i<n;i++)if(arrangement[i]&&enabled.has(arrangement[i]))slots.push(i);
  return slots;
}
function renderFlat(){
  const slots=flatSlots();
  const cols=effectiveCols();
  grid.style.gridTemplateColumns="repeat("+cols+",var(--door-size))";
  grid.style.gap=settings.gap+"px";
  grid.innerHTML="";
  slots.forEach((i,k)=>{
    const img=images.find(x=>x.id===arrangement[i]);
    const o=overrides[i]||{};
    const d=document.createElement("div");
    d.className="flat-item";
    d.dataset.i=i;
    d.draggable=true;
    if(animateNext)d.style.setProperty("--d",Math.min(k*14,400)+"ms");
    else d.style.animation="none";
    const im=document.createElement("img");
    im.src=img.src;im.alt="";im.draggable=false;
    const tr=imgTransformStyle(o);
    if(tr)im.style.transform=tr;
    d.appendChild(im);
    d.addEventListener("contextmenu",e=>{e.preventDefault();openDoorMenu(e,i);});
    d.addEventListener("dragstart",e=>{
      e.dataTransfer.setData("text/plain","door:"+i);
      d.classList.add("dragging");
    });
    d.addEventListener("dragend",()=>d.classList.remove("dragging"));
    d.addEventListener("dragover",e=>{e.preventDefault();d.classList.add("dragover");});
    d.addEventListener("dragleave",()=>d.classList.remove("dragover"));
    d.addEventListener("drop",e=>{
      e.preventDefault();
      d.classList.remove("dragover");
      const data=e.dataTransfer.getData("text/plain");
      if(data.startsWith("door:")){
        const src=+data.slice(5);
        if(src!==i){[arrangement[src],arrangement[i]]=[arrangement[i],arrangement[src]];}
      }else if(data.startsWith("lib:")){
        const lid=data.slice(4);
        if(enabled.has(lid))arrangement[i]=lid;
      }
      animateNext=false;
      saveArrangement();renderGrid();
    });
    grid.appendChild(d);
  });
  animateNext=false;
  grid.appendChild(makeAddCard());
}
function occupiedSlots(){
  const n=doorCountVal();
  const slots=[];
  for(let i=0;i<n;i++)if(arrangement[i])slots.push(i);
  return slots;
}
function isLocked(i){return !!(overrides[i]&&overrides[i].locked);}
function sortInto(keyFn){
  const slots=occupiedSlots().filter(i=>!isLocked(i));
  const list=slots.map(i=>arrangement[i]).sort((a,b)=>{
    const ia=images.find(x=>x.id===a),ib=images.find(x=>x.id===b);
    return keyFn(ia,ib);
  });
  slots.forEach((s,k)=>arrangement[s]=list[k]);
  animateNext=true;
  saveArrangement();renderGrid();
}
const byFile=(a,b)=>a.file.localeCompare(b.file,undefined,{numeric:true});
function shuffleArrangement(){
  const n=doorCountVal();
  const lockedIds=new Set();
  for(let i=0;i<n;i++)if(isLocked(i)&&arrangement[i])lockedIds.add(arrangement[i]);
  const pool=images.filter(i=>enabled.has(i.id)&&!lockedIds.has(i.id));
  for(let k=pool.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[pool[k],pool[j]]=[pool[j],pool[k]];}
  for(let i=0;i<n;i++){
    if(isLocked(i))continue;
    const it=pool.shift();
    arrangement[i]=it?it.id:null;
  }
  openDoors.clear();
  animateNext=true;
  saveArrangement();renderGrid();
}
function autoAssign(){
  const n=doorCountVal();
  const pool=images.filter(i=>enabled.has(i.id)).sort(byFile);
  arrangement=new Array(MAX_DOORS).fill(null);
  pool.slice(0,n).forEach((img,k)=>arrangement[k]=img.id);
  saveArrangement();
}
function applySettings(){
  const r=document.documentElement.style;
  r.setProperty("--door-size",settings.doorSize+"px");
  r.setProperty("--gap",settings.gap+"px");
  r.setProperty("--radius",settings.radius+"px");
  r.setProperty("--door-bg",settings.doorBg);
  r.setProperty("--text-color",settings.textColor);
  r.setProperty("--num-size",settings.numSize+"px");
  r.setProperty("--border-w",settings.borderW+"px");
  r.setProperty("--border-color",settings.borderColor);
  r.setProperty("--page-bg",settings.pageBg);
  r.setProperty("--front-opacity",settings.front.opacity);
  const pt=$("#pageTitle");
  pt.textContent=settings.title;
  pt.classList.toggle("hidden",!settings.titleShow);
  const map={setDoorSize:"doorSize",setGap:"gap",setRadius:"radius",setNumSize:"numSize",
    setNumPos:"numPos",setDoorBg:"doorBg",setTextColor:"textColor",setBorderW:"borderW",
    setBorderColor:"borderColor",setPageBg:"pageBg",setTitle:"title"};
  for(const[id,key]of Object.entries(map)){
    const el=$("#"+id);
    if(!el)continue;
    if(el.type==="checkbox")el.checked=!!settings[key];
    else el.value=settings[key];
  }
  $("#setTitleShow").checked=settings.titleShow;
  $("#setShowNums").checked=settings.showNums;
  ["DoorSize","Gap","Radius","NumSize","BorderW"].forEach(k=>{
    const o=$("#out"+k);if(o)o.textContent=settings[k.charAt(0).toLowerCase()+k.slice(1)];
  });
  $("#setFrontOpacity").value=Math.round(settings.front.opacity*100);
  $("#outFrontOpacity").textContent=Math.round(settings.front.opacity*100);
  $("#setFrontFit").value=settings.front.fit;
  $("#setCoverPage").checked=!!settings.front.coverPage;
  updateFrontUI();
  updateModeUI();
}
function updateFrontUI(){
  const w=$("#frontPrevWrap"),im=$("#frontPrev");
  if(settings.front.src){w.classList.remove("hidden");im.src=settings.front.src;}
  else{w.classList.add("hidden");im.removeAttribute("src");}
}
function updateModeUI(){
  const flat=settings.mode==="flat";
  $("#segDoors").classList.toggle("active",!flat);
  $("#segImages").classList.toggle("active",flat);
  $("#btnOpenAll").disabled=flat;
  $("#btnCloseAll").disabled=flat;
  $("#printOpened").disabled=flat;
}
function wireSettings(){
  const handlers={
    setDoorSize:v=>{settings.doorSize=+v;$("#outDoorSize").textContent=v;renderGrid();},
    setGap:v=>{settings.gap=+v;$("#outGap").textContent=v;renderGrid();},
    setRadius:v=>{settings.radius=+v;$("#outRadius").textContent=v;},
    setNumSize:v=>{settings.numSize=+v;$("#outNumSize").textContent=v;},
    setNumPos:v=>{settings.numPos=v;renderGrid();},
    setDoorBg:v=>{settings.doorBg=v;},
    setTextColor:v=>{settings.textColor=v;},
    setBorderW:v=>{settings.borderW=+v;$("#outBorderW").textContent=v;},
    setBorderColor:v=>{settings.borderColor=v;},
    setPageBg:v=>{settings.pageBg=v;},
    setTitle:v=>{settings.title=v;$("#pageTitle").textContent=v;},
    setShowNums:v=>{settings.showNums=v;renderGrid();},
    setFrontOpacity:v=>{settings.front.opacity=v/100;$("#outFrontOpacity").textContent=v;renderGrid();},
    setFrontFit:v=>{settings.front.fit=v;renderGrid();}
  };
  for(const[id,fn]of Object.entries(handlers)){
    const el=$("#"+id);
    el.addEventListener("input",()=>{fn(el.type==="checkbox"?el.checked:el.value);applySettings();saveSettings();});
  }
  $("#setCoverPage").addEventListener("change",e=>{
    settings.front.coverPage=e.target.checked;saveSettings();
  });
  $("#setTitleShow").addEventListener("change",e=>{
    settings.titleShow=e.target.checked;
    $("#pageTitle").classList.toggle("hidden",!settings.titleShow);
    saveSettings();
  });
  $("#btnSave").onclick=()=>{saveSettings();toast(t("tSaved"),"success");};
  $("#btnResetSet").onclick=()=>{
    const lang=settings.lang,mode=settings.mode;
    settings=JSON.parse(JSON.stringify(DEFAULTS));
    settings.lang=lang;settings.mode=mode;
    applySettings();renderGrid();saveSettings();
    toast(t("tResetSet"),"info");
  };
  $("#btnFrontUpload").onclick=()=>$("#frontFile").click();
  $("#btnFrontClear").onclick=()=>{
    settings.front.id=null;settings.front.src=null;
    saveSettings();updateFrontUI();renderGrid();
    toast(t("tFrontCleared"),"info");
  };
  $("#frontFile").addEventListener("change",async e=>{
    const f=e.target.files[0];
    e.target.value="";
    if(!f||!f.type.startsWith("image/"))return;
    if(backend){
      try{
        const res=await fetch("/upload",{
          method:"POST",
          headers:{"x-filename":encodeURIComponent("front-"+Date.now()+"-"+f.name),"Content-Type":"application/octet-stream"},
          body:f
        });
        const j=await res.json();
        if(j&&j.ok&&j.file){
          const name=j.file.split("/").pop();
          const id="up-"+name;
          if(!images.some(x=>x.id===id))images.push({id,file:j.file,set:"upload",src:j.file,upload:true});
          settings.front.id=id;settings.front.src=j.file;
        }else throw new Error();
      }catch(err){toast(t("tUploadFail"),"error");return;}
    }else{
      settings.front.id=null;
      settings.front.src=URL.createObjectURL(f);
    }
    saveSettings();updateFrontUI();renderGrid();
    toast(t("tFrontSet"),"success");
  });
}
function ensureJsPDF(){
  if(window.jspdf&&window.jspdf.jsPDF)return Promise.resolve(true);
  return new Promise(res=>{
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload=()=>res(!!(window.jspdf&&window.jspdf.jsPDF));
    s.onerror=()=>res(false);
    document.head.appendChild(s);
    setTimeout(()=>res(!!(window.jspdf&&window.jspdf.jsPDF)),6000);
  });
}
function loadImage(src){
  return new Promise(res=>{
    const im=new Image();
    im.crossOrigin="anonymous";
    const tm=setTimeout(()=>res(null),5000);
    im.onload=()=>{clearTimeout(tm);res(im);};
    im.onerror=()=>{clearTimeout(tm);res(null);};
    im.src=src;
  });
}
function imageData(im){
  try{
    const c=document.createElement("canvas");
    c.width=im.naturalWidth;c.height=im.naturalHeight;
    c.getContext("2d").drawImage(im,0,0);
    return c.toDataURL("image/png");
  }catch(e){return null;}
}
function transformImage(im,rot,flip){
  try{
    const r=((rot%360)+360)%360;
    const swap=r===90||r===270;
    const c=document.createElement("canvas");
    c.width=swap?im.naturalHeight:im.naturalWidth;
    c.height=swap?im.naturalWidth:im.naturalHeight;
    const g=c.getContext("2d");
    g.translate(c.width/2,c.height/2);
    if(r)g.rotate(r*Math.PI/180);
    if(flip)g.scale(-1,1);
    g.drawImage(im,-im.naturalWidth/2,-im.naturalHeight/2);
    return c.toDataURL("image/png");
  }catch(e){return null;}
}
function hexToRgb(h){
  const m=h.replace("#","");
  return [parseInt(m.slice(0,2),16),parseInt(m.slice(2,4),16),parseInt(m.slice(4,6),16)];
}
function drawFrontPdf(doc,cx,cy,cell,rad,im){
  const data=imageData(im);
  if(!data)return false;
  const o=settings.front.opacity;
  const fit=settings.front.fit||"cover";
  try{
    doc.saveGraphicsState();
    try{doc.setGState(new doc.GState({opacity:o}));}catch(e){}
    if(fit==="cover"){
      const ar=im.naturalWidth/im.naturalHeight;
      let w=cell,h=cell/ar;
      if(h<cell){h=cell;w=cell*ar;}
      doc.roundedRect(cx,cy,cell,cell,rad,rad,null);
      doc.clip();
      doc.addImage(data,"PNG",cx+(cell-w)/2,cy+(cell-h)/2,w,h);
    }else{
      const ar=im.naturalWidth/im.naturalHeight;
      let w=cell,h=cell/ar;
      if(h>cell){h=cell;w=cell*ar;}
      doc.addImage(data,"PNG",cx+(cell-w)/2,cy+(cell-h)/2,w,h);
    }
    doc.restoreGraphicsState();
    return true;
  }catch(e){return false;}
}
async function pdfCoverPage(doc,pw,ph){
  if(!(settings.front&&settings.front.src&&settings.front.coverPage))return false;
  const im=await loadImage(settings.front.src);
  if(!im)return false;
  const data=imageData(im);
  if(!data)return false;
  const ar=im.naturalWidth/im.naturalHeight;
  let w=pw,h=pw/ar;
  if(h>ph){h=ph;w=ph*ar;}
  doc.addImage(data,"PNG",(pw-w)/2,(ph-h)/2,w,h);
  return true;
}
async function exportPDF(){
  const btn=$("#btnPdf");
  btn.disabled=true;
  btn.classList.add("loading");
  const old=btn.textContent;
  btn.textContent=t("exporting");
  try{
    const ok=await ensureJsPDF();
    if(!ok){toast(t("tPdfNoLib"),"error");window.print();return;}
    const n=doorCountVal();
    const start=+$("#startNumber").value||1;
    const {jsPDF}=window.jspdf;
    if(settings.mode==="flat"){
      await exportFlatPDF(doc=>new jsPDF({orientation:doc,unit:"mm",format:"a4"}),n);
    }else{
      await exportDoorsPDF(jsPDF,n,start);
    }
    toast(t("tPdfOk"),"success");
    flashSuccess(btn);
  }finally{
    btn.disabled=false;
    btn.classList.remove("loading");
    btn.textContent=old;
  }
}
async function exportDoorsPDF(jsPDF,n,start){
  const cols=getGridCols();
  const orientation=cols>=5?"landscape":"portrait";
  const doc=new jsPDF({orientation,unit:"mm",format:"a4"});
  const pw=doc.internal.pageSize.getWidth(),ph=doc.internal.pageSize.getHeight();
  const hasCover=await pdfCoverPage(doc,pw,ph);
  if(hasCover)doc.addPage();
  const M=12,G=4;
  const titleH=settings.titleShow?14:0;
  const availW=pw-2*M, availH=ph-2*M-titleH;
  const cell=(availW-G*(cols-1))/cols;
  const rowsPerPage=Math.max(1,Math.floor((availH+G)/(cell+G)));
  const gridW=cols*cell+G*(cols-1);
  const x0=(pw-gridW)/2;
  const y0=M+titleH;
  const doorMm=cell;
  if(settings.titleShow&&settings.title){
    doc.setFont("helvetica","bold");
    doc.setFontSize(20);
    doc.setTextColor(31,92,51);
    doc.text(settings.title,pw/2,M+7,{align:"center"});
  }
  for(let i=0;i<n;i++){
    const rowIdx=Math.floor(i/cols);
    if(rowIdx>0&&rowIdx%rowsPerPage===0)doc.addPage();
    const pageRow=rowIdx%rowsPerPage;
    const cx=x0+(i%cols)*(cell+G);
    const cy=y0+pageRow*(cell+G);
    const rad=Math.min(settings.radius*(doorMm/settings.doorSize),cell/2);
    const [br,bg,bb]=hexToRgb(settings.borderColor);
    const [dr,dg,db]=hexToRgb(settings.doorBg);
    const o=overrides[i]||{};
    const img=images.find(x=>x.id===arrangement[i]);
    let drewImage=false;
    if(img&&(openDoors.has(i)||$("#printOpened").checked)){
      const im=await loadImage(img.src);
      if(im){
        const data=(o.rot||o.flip)?transformImage(im,o.rot||0,o.flip):imageData(im);
        if(data){
          const ar=im.naturalWidth/im.naturalHeight;
          const swap=(o.rot||0)%180!==0;
          const ratio=swap?1/ar:ar;
          let w=cell,h=cell/ratio;
          if(h>cell){h=cell;w=cell*ratio;}
          doc.addImage(data,"PNG",cx+(cell-w)/2,cy+(cell-h)/2,w,h);
          drewImage=true;
        }
      }
    }
    if(!drewImage){
      doc.setFillColor(dr,dg,db);
      doc.setDrawColor(br,bg,bb);
      doc.setLineWidth(Math.max(settings.borderW*0.26,0.1));
      doc.roundedRect(cx,cy,cell,cell,rad,rad,"FD");
      const fsrc=frontSrcFor(i);
      if(fsrc){
        const fim=await loadImage(fsrc);
        if(fim)drawFrontPdf(doc,cx,cy,cell,rad,fim);
      }
      if(settings.showNums){
        doc.setFont("helvetica","bold");
        doc.setFontSize(Math.max(settings.numSize*(doorMm/settings.doorSize),6));
        const [tr,tg,tb]=hexToRgb(settings.textColor);
        doc.setTextColor(tr,tg,tb);
        const pos=settings.numPos;
        let tx=cx+3,ty=cy+5,align="left";
        if(pos==="tr"||pos==="br"){tx=cx+cell-3;align="right";}
        if(pos==="tl"||pos==="tr")ty=cy+5;
        if(pos==="bl"||pos==="br")ty=cy+cell-2.5;
        if(pos==="c"){tx=cx+cell/2;ty=cy+cell/2+2;align="center";}
        doc.text(doorLabel(i),tx,ty,{align});
      }
    }
  }
  doc.save("adventskalender.pdf");
}
async function exportFlatPDF(mkDoc,n){
  const slots=flatSlots();
  const cols=getGridCols();
  const G=4,M=12;
  const doc=mkDoc(cols>=5?"landscape":"portrait");
  const pw=doc.internal.pageSize.getWidth(),ph=doc.internal.pageSize.getHeight();
  const hasCover=await pdfCoverPage(doc,pw,ph);
  if(hasCover)doc.addPage();
  const availW=pw-2*M,availH=ph-2*M;
  const cell=(availW-G*(cols-1))/cols;
  const rpp=Math.max(1,Math.floor((availH+G)/(cell+G)));
  const perPage=cols*rpp;
  const gridW=cols*cell+G*(cols-1);
  const x0=(pw-gridW)/2;
  for(let p=0;p*perPage<slots.length;p++){
    if(p>0)doc.addPage();
    const chunk=slots.slice(p*perPage,(p+1)*perPage);
    chunk.forEach((slot,k)=>{
      const cx=x0+(k%cols)*(cell+G);
      const cy=M+Math.floor(k/cols)*(cell+G);
      const img=images.find(x=>x.id===arrangement[slot]);
      if(!img)return;
      const o=overrides[slot]||{};
      loadImage(img.src).then(im=>{
        if(!im)return;
        const data=(o.rot||o.flip)?transformImage(im,o.rot||0,o.flip):imageData(im);
        if(!data)return;
        const swap=((o.rot||0)%180)!==0;
        const ar=im.naturalWidth/im.naturalHeight;
        const ratio=swap?1/ar:ar;
        let w=cell,h=cell/ratio;
        if(h>cell){h=cell;w=cell*ratio;}
        doc.addImage(data,"PNG",cx+(cell-w)/2,cy+(cell-h)/2,w,h);
      });
    });
  }
  await new Promise(r=>setTimeout(r,300));
  doc.save("adventskalender.pdf");
}
function exportJSON(){
    const data={
    app:"adventskalender-arranger",version:2,
    gridCols:getGridCols(),
    gridRows:getGridRows(),
    gridExtra:gridExtra,
    doorCount:doorCountVal(),
    startNumber:+$("#startNumber").value||1,
    enabled:[...enabled],
    arrangement:arrangement.slice(0,MAX_DOORS),
    overrides,
    settings
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="adventskalender-arrangement.json";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  toast(t("tJsonOk"),"success");
  flashSuccess($("#btnExportJson"));
}
function importJSON(file){
  const rd=new FileReader();
  rd.onload=()=>{
    try{
      const d=JSON.parse(rd.result);
      if(!d||!Array.isArray(d.arrangement))throw new Error("bad file");
      if(d.settings)settings={...DEFAULTS,...d.settings,front:{...DEFAULTS.front,...(d.settings.front||{})}};
      if(settings.front&&settings.front.src&&settings.front.src.startsWith("blob:")&&!settings.front.id){
        settings.front.src=null;settings.front.id=null;
      }
      if(Array.isArray(d.enabled))enabled=new Set(d.enabled.filter(id=>images.some(i=>i.id===id)));
      if(d.overrides&&typeof d.overrides==="object")overrides=d.overrides;
      let gc=d.gridCols,gr=d.gridRows;
      if(!gc||!gr){
        const dc=Math.max(1,Math.min(MAX_DOORS,d.doorCount||24));
        gc=Math.min(52,Math.max(1,Math.ceil(Math.sqrt(dc))));
        gr=Math.min(52,Math.max(1,Math.ceil(dc/gc)));
      }
      $("#gridCols").value=Math.max(1,Math.min(52,+gc||6));
      $("#gridRows").value=Math.max(1,Math.min(52,+gr||4));
      gridExtra=Math.max(-MAX_DOORS,Math.min(MAX_DOORS,+d.gridExtra||0));
      $("#startNumber").value=d.startNumber!=null?d.startNumber:1;
      arrangement=new Array(MAX_DOORS).fill(null);
      d.arrangement.forEach((id,i)=>{
        if(i<MAX_DOORS&&id&&images.some(x=>x.id===id))arrangement[i]=id;
      });
      openDoors.clear();
      applyI18n();applySettings();buildLibrary();renderGrid();saveSettings();saveArrangement();
      toast(t("tImportOk"),"success");
    }catch(e){toast(t("tImportFail"),"error");}
  };
  rd.readAsText(file);
}
async function addCustomImages(files){
  const list=[...files].filter(f=>f.type.startsWith("image/"));
  if(!list.length)return;
  if(backend){
    let done=0;
    for(const f of list){
      toast(tf("tUploading",{a:done+1,b:list.length}),"info");
      try{
        const res=await fetch("/upload",{
          method:"POST",
          headers:{"x-filename":encodeURIComponent(f.name),"Content-Type":"application/octet-stream"},
          body:f
        });
        const j=await res.json();
        if(j&&j.ok&&j.file){
          const name=j.file.split("/").pop();
          const id="up-"+name;
          if(!images.some(x=>x.id===id))images.push({id,file:j.file,set:"upload",src:j.file,upload:true});
          enabled.add(id);
        }else throw new Error();
      }catch(e){toast(t("tUploadFail"),"error");}
      done++;
    }
    activeFilter="all";
    buildLibrary();renderGrid();saveArrangement();
    toast(t("tCustomAdded"),"success");
  }else{
    list.forEach(f=>{
      customCounter++;
      const id="custom-"+customCounter+"-"+f.name.replace(/\W+/g,"-");
      images.push({id,file:"(custom) "+f.name,set:"custom",src:URL.createObjectURL(f),custom:true});
      enabled.add(id);
    });
    activeFilter="all";
    buildLibrary();renderGrid();saveArrangement();
    toast(t("tCustomAdded"),"success");
  }
}
async function deleteImage(img){
  const ok=await confirmModal("mDelTitle","mDelBody");
  if(!ok)return;
  if(img.upload){
    try{await fetch("/uploads/"+encodeURIComponent(img.file.split("/").pop()),{method:"DELETE"});}catch(e){}
  }else if(img.custom&&img.src.startsWith("blob:")){
    URL.revokeObjectURL(img.src);
  }
  images=images.filter(x=>x.id!==img.id);
  enabled.delete(img.id);
  for(let i=0;i<MAX_DOORS;i++)if(arrangement[i]===img.id)arrangement[i]=null;
  for(const k in overrides)if(overrides[k]&&overrides[k].frontId===img.id)delete overrides[k].frontId;
  if(settings.front&&settings.front.id===img.id){settings.front.id=null;settings.front.src=null;saveSettings();updateFrontUI();}
  buildLibrary();renderGrid();saveArrangement();
  toast(t("tDeleted"),"success");
}
function closeModal(val){
  mw.classList.add("hidden");
  const r=modalResolve;
  modalResolve=null;
  if(r)r(val);
}
mw.addEventListener("click",e=>{if(e.target===mw)closeModal(null);});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    if(!mw.classList.contains("hidden"))closeModal(null);
    ctx.classList.add("hidden");
  }
});
function addModalClose(){
  const xb=document.createElement("button");
  xb.className="modal-close";
  xb.type="button";
  xb.setAttribute("aria-label","Close");
  xb.textContent="\u00d7";
  xb.onclick=()=>closeModal(null);
  mb.appendChild(xb);
}
function confirmModal(titleKey,bodyKey){
  return new Promise(res=>{
    modalResolve=res;
    mb.innerHTML="";
    addModalClose();
    const h=document.createElement("h3");h.textContent=t(titleKey);
    const p=document.createElement("p");p.textContent=t(bodyKey);
    const row=document.createElement("div");row.className="modal-row";
    const c=document.createElement("button");c.textContent=t("mCancel");c.onclick=()=>closeModal(null);
    const ok=document.createElement("button");ok.className="danger";ok.textContent=t("mConfirm");ok.onclick=()=>closeModal(true);
    row.append(c,ok);
    mb.append(h,p,row);
    mw.classList.remove("hidden");
    ok.focus();
  });
}
function textModal(titleKey,labelKey,initial){
  return new Promise(res=>{
    modalResolve=res;
    mb.innerHTML="";
    addModalClose();
    const h=document.createElement("h3");h.textContent=t(titleKey);
    const lab=document.createElement("label");lab.className="field";
    const sp=document.createElement("span");sp.textContent=t(labelKey);
    const inp=document.createElement("input");inp.type="text";inp.value=initial||"";
    lab.append(sp,inp);
    const row=document.createElement("div");row.className="modal-row";
    const c=document.createElement("button");c.textContent=t("mCancel");c.onclick=()=>closeModal(null);
    const ok=document.createElement("button");ok.className="primary";ok.textContent=t("mSave");
    ok.onclick=()=>closeModal(inp.value);
    inp.addEventListener("keydown",e=>{if(e.key==="Enter")closeModal(inp.value);});
    row.append(c,ok);
    mb.append(h,lab,row);
    mw.classList.remove("hidden");
    inp.focus();
  });
}
function pickerModal(titleKey,entries){
  return new Promise(res=>{
    modalResolve=res;
    mb.innerHTML="";
    addModalClose();
    const h=document.createElement("h3");h.textContent=t(titleKey);
    const wrap=document.createElement("div");
    const hasImg=entries.some(e=>e.src);
    wrap.className=hasImg?"pick-grid":"pick-door";
    entries.forEach(en=>{
      const b=document.createElement("button");
      if(en.src){
        const im=document.createElement("img");im.src=en.src;im.draggable=false;
        const sp=document.createElement("span");sp.textContent=en.label;
        b.append(im,sp);
      }else{
        b.textContent=en.label;
      }
      b.onclick=()=>closeModal(en.value);
      wrap.appendChild(b);
    });
    mb.append(h,wrap);
    mw.classList.remove("hidden");
  });
}
function closeMenu(){ctx.classList.add("hidden");}
document.addEventListener("click",e=>{if(!ctx.contains(e.target))closeMenu();});
window.addEventListener("scroll",closeMenu,true);
window.addEventListener("resize",closeMenu);
function openMenu(x,y,items){
  ctx.innerHTML="";
  const xbtn=document.createElement("button");
  xbtn.className="menu-x";
  xbtn.type="button";
  xbtn.setAttribute("aria-label","Close");
  xbtn.textContent="\u00d7";
  xbtn.onclick=closeMenu;
  ctx.appendChild(xbtn);
  items.forEach(it=>{
    const b=document.createElement("button");
    b.textContent=it.label;
    if(it.danger)b.classList.add("danger");
    b.onclick=()=>{closeMenu();animateNext=false;it.fn();};
    ctx.appendChild(b);
  });
  ctx.classList.remove("hidden");
  const r=ctx.getBoundingClientRect();
  ctx.style.left=Math.max(4,Math.min(x,innerWidth-r.width-8))+"px";
  ctx.style.top=Math.max(4,Math.min(y,innerHeight-r.height-8))+"px";
}
function shiftDoors(from,delta){
  const n=doorCountVal();
  if(delta>0){
    for(let j=n-1;j>=from;j--)arrangement[j+1]=arrangement[j];
    for(let j=n-1;j>=from;j--){if(overrides[j])overrides[j+1]=overrides[j];}
    const od=new Set();openDoors.forEach(k=>od.add(k>=from?k+1:k));openDoors.clear();od.forEach(k=>openDoors.add(k));
  }else{
    for(let j=from;j<MAX_DOORS-1;j++)arrangement[j]=arrangement[j+1];
    for(let j=from;j<MAX_DOORS-1;j++){delete overrides[j];if(overrides[j+1])overrides[j]=overrides[j+1];}
    delete overrides[MAX_DOORS-1];
    const od=new Set();openDoors.forEach(k=>od.add(k>from?k-1:k));openDoors.clear();od.forEach(k=>openDoors.add(k));
  }
}
function openDoorMenu(e,i){
  const o=overrides[i]||{};
  const id=arrangement[i];
  const img=(id&&enabled.has(id))?images.find(x=>x.id===id):(id?images.find(x=>x.id===id):null);
  const isOpen=openDoors.has(i);
  const items=[];
  items.push({label:t(isOpen?"ctxClose":"ctxOpen"),fn:()=>{openDoors.has(i)?openDoors.delete(i):openDoors.add(i);renderGrid();}});
  if(id)items.push({label:t("ctxRemove"),fn:()=>{arrangement[i]=null;saveArrangement();renderGrid();toast(t("tImgRemoved"),"info");}});
  items.push({label:t("ctxDeleteDoor"),danger:true,fn:()=>{
    if(doorCountVal()<=1){toast(t("tDoorMin"),"error");return;}
    gridExtra--;
    shiftDoors(i,-1);
    saveArrangement();renderGrid();
    toast(tf("tDoorsNow",{a:doorCountVal()}),"info");
  }});
  items.push({label:t("ctxRandom"),fn:()=>{
    const pool=images.filter(x=>enabled.has(x.id));
    if(!pool.length){toast(t("tNothingEnabled"),"error");return;}
    arrangement[i]=pool[Math.floor(Math.random()*pool.length)].id;
    saveArrangement();renderGrid();
  }});
  if(img)items.push({label:t("ctxRotate"),fn:()=>{
    overrides[i]={...o,rot:(((o.rot||0)+90)%360)};
    saveArrangement();renderGrid();
  }});
  if(img)items.push({label:t("ctxFlip"),fn:()=>{
    overrides[i]={...o,flip:!o.flip};
    saveArrangement();renderGrid();
  }});
  items.push({label:t("ctxEditNum"),fn:async()=>{
    const v=await textModal("mNumTitle","mNumLabel",o.label||"");
    if(v===null)return;
    if(v==="")delete overrides[i].label;
    else overrides[i]={...overrides[i],label:v};
    saveArrangement();renderGrid();
    toast(t("tNumSaved"),"success");
  }});
  items.push({label:t(o.locked?"ctxUnlock":"ctxLock"),fn:()=>{
    const nowLocked=!o.locked;
    overrides[i]={...o,locked:nowLocked};
    saveArrangement();renderGrid();
    toast(t(nowLocked?"tLocked":"tUnlocked"),"info");
  }});
  items.push({label:t("ctxAssignFront"),fn:async()=>{
    const pool=images.filter(x=>enabled.has(x.id));
    if(!pool.length){toast(t("tNothingEnabled"),"error");return;}
    const v=await pickerModal("mPickImg",pool.slice(0,60).map(x=>({label:x.file.split("/").pop(),src:x.src,value:x.id})));
    if(v===null)return;
    overrides[i]={...(overrides[i]||{}),frontId:v};
    saveArrangement();renderGrid();
    toast(t("tFrontSet"),"success");
  }});
  if(o.frontId)items.push({label:t("ctxClearFront"),fn:()=>{
    delete overrides[i].frontId;
    saveArrangement();renderGrid();
    toast(t("tFrontCleared"),"info");
  }});
  if(img){
    if(enabled.has(img.id))items.push({label:t("ctxDisable"),fn:()=>{
      enabled.delete(img.id);purgeDisabled();
      buildLibrary();renderGrid();saveArrangement();
    }});
    else items.push({label:t("ctxEnable"),fn:()=>{
      enabled.add(img.id);
      buildLibrary();renderGrid();saveArrangement();
    }});
  }
  if(img&&(img.custom||img.upload))items.push({label:t("ctxDeleteLib"),danger:true,fn:()=>deleteImage(img)});
  openMenu(e.clientX,e.clientY,items);
}
function openLibMenu(e,img){
  const dis=!enabled.has(img.id);
  const items=[];
  items.push({label:t(dis?"ctxEnable":"ctxDisable"),fn:()=>{
    if(dis)enabled.add(img.id);
    else{enabled.delete(img.id);purgeDisabled();}
    buildLibrary();renderGrid();saveArrangement();
  }});
  items.push({label:t("ctxAddFirstFree"),fn:()=>{
    if(!enabled.has(img.id))enabled.add(img.id);
    const n=doorCountVal();
    let target=-1;
    for(let i=0;i<n;i++){if(!arrangement[i]){target=i;break;}}
    if(target<0){toast(t("tNoFreeDoor"),"error");return;}
    arrangement[target]=img.id;
    saveArrangement();renderGrid();
    toast(tf("tAddedDoor",{a:target+1}),"success");
  }});
  items.push({label:t("ctxAssignFrontDoor"),fn:async()=>{
    const n=doorCountVal();
    const start=+$("#startNumber").value||1;
    const entries=[];
    for(let i=0;i<n;i++)entries.push({label:doorLabel(i),value:i});
    const v=await pickerModal("mPickDoor",entries);
    if(v===null)return;
    overrides[v]={...(overrides[v]||{}),frontId:img.id};
    saveArrangement();renderGrid();
    toast(t("tFrontSet"),"success");
  }});
  if(img.custom||img.upload)items.push({label:t("ctxDeleteLib"),danger:true,fn:()=>deleteImage(img)});
  openMenu(e.clientX,e.clientY,items);
}
function preparePrint(){
  const cov=$("#printCover");
  if(settings.front&&settings.front.src&&settings.front.coverPage){
    cov.innerHTML="";
    const im=document.createElement("img");
    im.src=settings.front.src;
    im.style.objectFit=settings.front.fit||"cover";
    im.style.maxWidth="100%";
    im.style.maxHeight="100%";
    cov.appendChild(im);
    document.body.classList.add("cover-print");
  }else{
    cov.innerHTML="";
    document.body.classList.remove("cover-print");
  }
}
function wireControls(){
  ["gridCols","gridRows"].forEach(id=>{
    $("#"+id).addEventListener("change",e=>{
      e.target.value=Math.max(1,Math.min(52,+e.target.value||6));
      gridExtra=0;
      saveArrangement();renderGrid();
    });
  });
  $("#startNumber").addEventListener("change",()=>{renderGrid();saveArrangement();});
  $("#btnShuffle").onclick=shuffleArrangement;
  $("#btnSortFile").onclick=()=>sortInto(byFile);
  $("#btnSortSet").onclick=()=>sortInto((a,b)=>a.set.localeCompare(b.set)||byFile(a,b));
  $("#btnReverse").onclick=()=>{
    const slots=occupiedSlots().filter(i=>!isLocked(i));
    const list=slots.map(i=>arrangement[i]).reverse();
    slots.forEach((s,k)=>arrangement[s]=list[k]);
    animateNext=true;
    saveArrangement();renderGrid();
  };
  $("#btnResetArr").onclick=()=>{
    arrangement=new Array(MAX_DOORS).fill(null);
    openDoors.clear();
    animateNext=true;
    saveArrangement();renderGrid();toast(t("tArrReset"),"info");
  };
  $("#btnOpenAll").onclick=()=>{
    const n=doorCountVal();
    for(let i=0;i<n;i++)openDoors.add(i);
    renderGrid();
    toast(t("tAllOpen"),"success");
  };
  $("#btnCloseAll").onclick=()=>{
    openDoors.clear();
    renderGrid();
    toast(t("tAllClosed"),"info");
  };
  $("#btnAllOn").onclick=()=>{images.forEach(i=>enabled.add(i.id));buildLibrary();renderGrid();saveArrangement();};
  $("#btnAllOff").onclick=()=>{enabled.clear();purgeDisabled();buildLibrary();renderGrid();saveArrangement();};
  $("#cbEnableAll").addEventListener("change",e=>{
    if(e.target.checked)images.forEach(i=>enabled.add(i.id));
    else{enabled.clear();purgeDisabled();}
    buildLibrary();renderGrid();saveArrangement();
  });
  $("#cbShowDisabled").addEventListener("change",e=>{
    showDisabled=e.target.checked;
    buildLibrary();
  });
  $("#btnAddImages").onclick=()=>$("#customFile").click();
  $("#customFile").addEventListener("change",e=>{
    addCustomImages(e.target.files);e.target.value="";
  });
  $("#btnPrint").onclick=()=>{preparePrint();window.print();};
  window.addEventListener("beforeprint",preparePrint);
  $("#printOpened").addEventListener("change",e=>{
    document.body.classList.toggle("print-opened",e.target.checked);
  });
  $("#btnPdf").onclick=exportPDF;
  $("#btnExportJson").onclick=exportJSON;
  $("#btnImportJson").onclick=()=>$("#importFile").click();
  $("#importFile").addEventListener("change",e=>{
    if(e.target.files[0])importJSON(e.target.files[0]);
    e.target.value="";
  });
  $("#btnToggleLib").onclick=()=>$("#library").classList.toggle("collapsed");
  $("#btnToggleSet").onclick=()=>$("#settingsPanel").classList.toggle("collapsed");
  $("#segDoors").onclick=()=>{settings.mode="doors";saveSettings();updateModeUI();renderGrid();};
  $("#segImages").onclick=()=>{settings.mode="flat";saveSettings();updateModeUI();renderGrid();};
  const langDD=$("#langSel"),langBtn=$("#langBtn"),langMenu=$("#langMenu");
  function closeLangDD(){langDD.classList.remove("open");langBtn.setAttribute("aria-expanded","false");}
  langBtn.addEventListener("click",e=>{
    e.stopPropagation();
    const open=langDD.classList.toggle("open");
    langBtn.setAttribute("aria-expanded",open?"true":"false");
    if(open)langMenu.querySelector("li[aria-selected='true']").focus();
  });
  $("#langClose").addEventListener("click",e=>{e.stopPropagation();closeLangDD();});
  langMenu.addEventListener("click",e=>{
    if(e.target.closest("#langClose"))return;
    const li=e.target.closest("li[data-lang]");
    if(!li)return;
    settings.lang=li.dataset.lang;
    syncTitleLang();
    saveSettings();applyI18n();buildLibrary();renderGrid();
    closeLangDD();
    toast(t("langChanged"),"success");
  });
  langMenu.addEventListener("keydown",e=>{
    const items=[...langMenu.querySelectorAll("li")];
    const idx=items.indexOf(document.activeElement);
    if(e.key==="ArrowDown"){e.preventDefault();items[Math.min(idx+1,items.length-1)].focus();}
    else if(e.key==="ArrowUp"){e.preventDefault();items[Math.max(idx-1,0)].focus();}
    else if(e.key==="Enter"||e.key===" "){e.preventDefault();document.activeElement.click();}
    else if(e.key==="Escape"){closeLangDD();langBtn.focus();}
  });
  document.addEventListener("click",e=>{if(!langDD.contains(e.target))closeLangDD();});
  window.addEventListener("scroll",closeLangDD,true);
  window.addEventListener("beforeprint",()=>{
    document.documentElement.style.setProperty("--print-cols",effectiveCols());
    const mm=25.4/96*3;
    document.documentElement.style.setProperty("--print-cell",(settings.doorSize*mm).toFixed(2)+"mm");
    document.documentElement.style.setProperty("--print-gap",(settings.gap*mm).toFixed(2)+"mm");
    document.documentElement.style.setProperty("--print-num",(settings.numSize*mm).toFixed(2)+"mm");
  });
  grid.addEventListener("dragover",e=>e.preventDefault());
}
async function init(){
  syncTitleLang();
  applyI18n();
  applySettings();
  wireSettings();
  wireControls();
  const saved=loadSaved();
  backend=await probeBackend();
  if(!backend)toast(t("tBackendWarn"),"info");
  const manifest=await loadManifest();
  if(manifest){
    images=manifest;
    if(saved){
      const known=new Set(images.map(i=>i.id));
      enabled=new Set((saved.enabled||[]).filter(id=>known.has(id)));
    }
    if(!enabled.size)images.forEach(i=>enabled.add(i.id));
  }else{
    images=[];
    enabled.clear();
    libList.innerHTML="";
    const msg=document.createElement("div");
    msg.className="count-line warn";
    msg.textContent=t("tLibFail");
    libList.appendChild(msg);
    $("#setChips").innerHTML="";
  }
  if(backend)await loadUploads();
  if(saved){
    if(saved.overrides&&typeof saved.overrides==="object")overrides=saved.overrides;
    if(saved.arrangement&&Array.isArray(saved.arrangement)){
      arrangement=new Array(MAX_DOORS).fill(null);
      const known=new Set(images.map(i=>i.id));
      saved.arrangement.forEach((id,i)=>{
        if(i<MAX_DOORS&&id&&known.has(id))arrangement[i]=id;
      });
    }
    if(saved.gridCols){$("#gridCols").value=Math.max(1,Math.min(52,+saved.gridCols||6));$("#gridRows").value=Math.max(1,Math.min(52,+saved.gridRows||4));gridExtra=Math.max(-MAX_DOORS,Math.min(MAX_DOORS,+saved.gridExtra||0));}
    else if(saved.doorCount){const dc=Math.max(1,Math.min(MAX_DOORS,saved.doorCount));const c=Math.min(52,Math.max(1,Math.ceil(Math.sqrt(dc))));$("#gridCols").value=c;$("#gridRows").value=Math.min(52,Math.max(1,Math.ceil(dc/c)));gridExtra=0;}
    if(saved.startNumber!=null)$("#startNumber").value=saved.startNumber;
  }
  if(images.length){
    if(!arrangement.slice(0,doorCountVal()).some(Boolean))autoAssign();
    else saveArrangement();
  }
  applyI18n();
  buildLibrary();
  animateNext=true;
  renderGrid();
}
init();
