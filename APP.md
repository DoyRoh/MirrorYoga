# 미러 요가 iOS 앱 만들기 (맥)

웹페이지(`index.html`)를 Capacitor로 감싸서 iOS 앱으로 만듭니다.
앱 안에는 자세 인식 모델까지 같이 들어가서 인터넷이 없어도 카메라 채점이 됩니다.

## 처음 한 번만

1. 맥에 설치하기
   - Xcode (App Store에서 설치, 처음 실행해서 추가 구성요소까지 설치)
   - Node.js LTS (https://nodejs.org)

2. 터미널에서 저장소 받기

   ```bash
   git clone https://github.com/DoyRoh/MirrorYoga.git
   cd MirrorYoga
   npm install
   ```

3. 앱에 넣을 파일 준비 (인식 모델 약 30MB를 내려받아요)

   ```bash
   npm run build
   ```

4. iOS 프로젝트 만들기

   ```bash
   npx cap add ios
   ```

5. 카메라 권한 문구, 홈 화면 이름 넣기 (이게 없으면 카메라를 켤 때 앱이 꺼져요)

   ```bash
   plutil -insert NSCameraUsageDescription -string "자세를 채점하려고 카메라를 사용해요. 영상은 이 기기 안에서만 처리돼요." ios/App/App/Info.plist
   plutil -replace CFBundleDisplayName -string "미러 요가" ios/App/App/Info.plist
   ```

6. Xcode 열기

   ```bash
   npx cap sync ios
   npx cap open ios
   ```

7. Xcode에서
   - 왼쪽에서 **App** 선택 → **Signing & Capabilities** → **Team**에 개발자 계정 선택
   - Bundle Identifier는 `com.doyroh.mirroryoga` (이미 쓰인 이름이라고 나오면 끝에 글자를 바꿔요)
   - 아이폰을 케이블로 연결하고 위쪽에서 기기를 고른 뒤 ▶ 실행
   - 폰에서 처음 실행할 때: 설정 → 일반 → VPN 및 기기 관리 → 개발자 앱 신뢰

## 웹 코드를 고친 뒤 앱에 반영하기

```bash
git pull
npm run build
npx cap sync ios
```

그다음 Xcode에서 ▶ 다시 실행.

## 가족 폰에 깔기 (TestFlight)

1. https://appstoreconnect.apple.com → 앱 → **+ 새로운 앱** (번들 ID는 위와 같게)
2. Xcode 위쪽 기기를 **Any iOS Device**로 → 메뉴 **Product → Archive**
3. 창이 뜨면 **Distribute App → App Store Connect → Upload**
4. App Store Connect의 **TestFlight** 탭에서 가족 이메일을 테스터로 초대
5. 가족은 폰에 TestFlight 앱을 깔고 초대 메일의 링크로 설치

## 참고

- 앱 안에서는 주소가 `capacitor://`로 시작하므로, 페이지가 이걸 보고 인터넷 대신 앱 안의 모델(`www/mp/`)을 씁니다.
- `www/`, `node_modules/`는 만들어지는 폴더라 GitHub에 올리지 않습니다.
- 앱 아이콘은 Xcode의 `App/Assets.xcassets/AppIcon`에 1024×1024 이미지를 넣으면 됩니다.
