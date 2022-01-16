# React Native Maps skeleton

Empty maps project with basic method examples

# Setup
## API KEY
You'll need an API key for this project form the google cloud console. The key needs to go in two places:

**\android\app\src\main\AndroidManifest.xml** as a child of the 'application' tag
```xml
<!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="{your api key here}"/>

<!-- You will also only need to add this uses-library tag -->
<uses-library android:name="org.apache.http.legacy" android:required="false"/>
```

**\android\app\src\main\res\values\google_maps_api.xml** create this file, entire contents should be:
```xml
<!-- map just appearing gray? -->
<resources>
    <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">{your api key here}</string>
</resources>
```
