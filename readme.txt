# Autorství zdrojových kódů

Dubrovin Maksim, xdubro01

## Adresářová struktura

### Hlavní část aplikace:
- `src/routes/Home/Home.jsx`:  
  Hlavní stránka aplikace, která slouží jako vstupní bod pro prezentaci dat a interakce s uživatelem.

### Komponenty využívané v hlavní stránce:
- `src/components/DataSection/DataSection.jsx`:  
  Sekce zobrazující přehled důležitých statistických údajů.
- `src/components/TrackingHistory/TrackingHistory.jsx`:  
  Historie sledování aktivity uživatele.
- `src/components/Selector/Selector.jsx`:  
  Komponent pro výběr období či filtrů.
- `src/components/PieCharts/PieCharts.jsx`:  
  Rámec pro vizualizaci dat pomocí kruhových grafů.
- `src/components/NutrientPieChart/NutrientPieChart.jsx`:  
  Vizualizace poměru živin (bílkoviny, sacharidy, tuky) za určité období.
- `src/components/ExerciseTypePieChart/ExerciseTypePieChart.jsx`:  
  Vizualizace nejčastěji trénovaných svalových skupin.
- `src/components/ExerciseAmountPieChart/ExerciseAmountPieChart.jsx`:  
  Statistiky počtu provedených cvičení za poslední 3 týdny.
- `src/components/FriendsSection/FriendsSection.jsx`:  
  Sekce pro zobrazení seznamu přátel a interakci s nimi.
- `src/components/Filter/Filter.jsx`:  
  Komponent pro filtrování zobrazených dat.
- `src/components/FriendList/FriendsList.jsx`:  
  Seznam přátel, který funguje jako messenger.
- `src/components/Chat/Chat.jsx`:  
  Rozhraní pro chatování s přáteli.
- `src/components/Message/Message.jsx`:  
  Komponent pro zobrazení jednotlivých zpráv v chatu.

### Služby a stavy aplikace:
- `src/services/userService.js`:  
  Služba pro správu dat uživatelů.
- `src/services/messageService.js`:  
  Služba pro práci se zprávami.
- `src/reducers/userReducer.js`:  
  Reducer pro správu stavu dat uživatelů.

---

## Autorství
Většinu kódu pro hlavní stránku aplikace `src/routes/Home/Home.jsx` a všechny výše uvedené komponenty, 
které tato stránka využívá, jsem vytvořil(a) osobně.



# Autorství zdrojových kódů

Anton Havlovskyi, xhavlo01

## Adresářová struktura

### Hlavní část aplikace:
- `src/routes/Food/Food.jsx`:  
  Stránka zaměřená na správu a přehled zkonzumovaného jidla, která umožňuje zobrazit seznam jidla v různých časových obdobích a přidávat nové záznamy.

### Komponenty využívané v hlavní stránce:
- `src/components/FoodEditor/FoodEditor.jsx`:  
  Prvek tabulky jídla, který zobrazuje podrobnosti a ovládací prvky položky
- `src/components/FoodSection/FoodSection.jsx`:  
  Vizualizace tabulky jidla a ovladacích prvků

### Služby a stavy aplikace:
- `src/services/FoodService.js`:  
  Služba pro správu stavu dat jidla pro jednotlivé uživatele.
- `src/reducers/FoodReducer.js`:  
  Reducer pro správu stavu dat jidla pro jednotlivé uživatele.



# Autorství zdrojových kódů

Anastasiia Mironova, xmiron05

## Adresářová struktura

### Hlavní část aplikace:
- `src/routes/Friends/Friends.jsx`:  

### Komponenty využívané v hlavní stránce:
- `src/components/AddedFriends/AddedFriends.jsx`:  
  Komponent pro zobrazování již přidaných přátel.
- `src/components/AddedFriendsList/AddedFriendsList.jsx`:  
  Seznam přidaných přátel.
- `src/components/FriendDetails/FriendDetails.jsx`:  
  Detailní informace o jednotlivých přátelích.
- `src/components/AddNewFriendList/AddNewFriendList.jsx`:  
  Komponent umožňující zobrazit seznam uživatelů, které lze přidat jako přátele.
- `src/components/UserList/UserList.jsx`:  
  Zobecněný seznam uživatelů používaný v různých částech aplikace.
- `src/components/UserListItem/UserListItem.jsx`:  
  Položka seznamu uživatelů, která obsahuje informace o konkrétním uživateli.

### Služby a stavy aplikace:
- `src/services/userService.js`:  
  Služba pro práci s daty uživatelů.
- `src/services/friendService.js`:  
  Služba zaměřená na správu přátel a jejich dat.
- `src/reducers/allUsersReducer.js`:  
  Reducer pro správu stavu dat všech uživatelů.



# Autorství zdrojových kódů

Ilya Volkov, xvolko02

## Adresářová struktura

### Hlavní část aplikace:
- `src/routes/Exercises/Exercises.jsx`:  
  Stránka zaměřená na správu a přehled cvičení uživatele, která umožňuje zobrazit seznam cvičení v různých časových obdobích a přidávat nová cvičení.

### Komponenty využívané v hlavní stránce:
- `src/components/Calendar/Calendar.jsx`:  
  Kalendářová komponenta pro výběr data nebo časového období, kdy byla cvičení provedena.
- `src/components/ExerciseList/ExerciseList.jsx`:  
  Seznam cvičení provedených uživatelem, který umožňuje jejich přehledné zobrazení.

### Služby a stavy aplikace:
- `src/services/exerciseService.js`:  
  Služba zaměřená na správu dat cvičení.
- `src/reducers/exerciseReducer.js`:  
  Reducer pro správu stavu dat cvičení.