# Akash Portfolio (React Native + Expo + Firebase)

Ek hi code se **Android app** aur **website** dono. Projects Firebase Firestore me store hote hain,
aur admin panel se aap unhe add / edit / delete karte ho.

## 1. Chalane ke liye (pehli baar)
```bash
npm install
npm run web        # browser me khulega
npm run android    # Android phone/emulator (Expo Go app se QR scan bhi chalega)
```
Node.js 18+ chahiye. Firebase connect kiye bina bhi app sample projects ke saath chalegi.

## 2. Firebase setup (5 min, free)
1. https://console.firebase.google.com pe naya project banao.
2. **Build > Firestore Database > Create database** (production mode).
3. **Build > Authentication > Get started > Email/Password** enable karo, phir **Users** tab me apna email + password wala user add karo. Ye aapka admin login hai.
4. **Project settings > Your apps > Web (</>)** me app register karo aur jo `firebaseConfig` mile use `src/firebase.js` me paste karo.
5. **Firestore > Rules** tab me `firestore.rules` file ka content paste karke Publish karo (usme apna admin email already hai).
6. App kholo, neeche footer me **Admin login** pe tap karo, login karo aur pehla project add karo.

## 3. Kya kahan badalna hai
- Naam, role, intro, services, steps, social links: `src/Portfolio.js` ke upar ME / SERVICES / STEPS.
- Colors: `src/theme.js`.
- Photo: `src/Portfolio.js` me `avatarRing` wale View ki jagah `<Image source={require('../assets/photo.png')} />`.

## 4. Website live karna
```bash
npm run build:web      # dist/ folder banta hai
```
`dist/` ko Netlify Drop, Vercel ya Firebase Hosting pe daal do.

## 5. Android APK
`npm i -g eas-cli && eas build -p android --profile preview` (Expo account chahiye).
