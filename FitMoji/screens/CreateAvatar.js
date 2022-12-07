import React, { useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { WebView } from "react-native-webview";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from '../firebase';

const CreateAvatar = ({ navigation }) => {
    const subdomain = "fitmoji";

    let isSubscribed = false;
    let count = 0;
    const correlationId = "a0bf9c2a-44d7-4882-8e72-4bc7ab73849f";
    let url = '';

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'avatars/' + auth.currentUser?.uid), {
          url: url
        })
        .catch(error => alert(error.message));
        navigation.replace("Home");
      }
    
    function onAvatarExported(message) {
        url = message.data?.url;
        writeUserData();
    }
    const webview = useRef();

    const subscribe = () => {
        if (isSubscribed) {
            return;
        }

        isSubscribed = true;
        webview.current.postMessage(
            JSON.stringify({
                target: "readyplayerme",
                type: "subscribe",
                eventName: "v1.avatar.exported",
            })
        );
    };

    const process = (data) => {
        const json = JSON.parse(data);

        // Filter for only Ready Player Me Events
        if (json.source !== "readyplayerme") {
            return;
        }

        if (json.eventName === "v1.avatar.exported") {
            // Event called after avatar has been created and the URL generated
            onAvatarExported(json);
        }

        if (json.eventName !== "v1.subscription.deleted") {
            count++;

            if (count > 4) {
                webview.current.postMessage(
                    JSON.stringify({
                        target: "readyplayerme",
                        type: "unsubscribe",
                        correlationId,
                    })
                );
            }
        }
    };

    return (
        <WebView
            ref={webview}
            source={{
                uri: `https://${subdomain}.readyplayer.me/avatar?frameApi&clearCache&bodyType=fullbody`,
            }}
            style={{ marginTop: 20 }}
            onLoad={subscribe}
            onMessage={(message) => process(message.nativeEvent.data)}
        />
    );
};

export default CreateAvatar;
