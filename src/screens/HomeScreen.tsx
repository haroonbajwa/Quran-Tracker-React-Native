import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as Animatable from "react-native-animatable";
import useTracker from "../hooks/useTracker";

export default function HomeScreen() {
  const {
    currentRuku,
    increment,
    decrement,
    progress,
    todayCount,
    streak,
    currentIndex,
  } = useTracker();

  return (
    <View style={styles.container}>
      {/* Quran Image */}
      {/* <Animatable.View animation="fadeInDown" duration={800}>
        <Image
          source={require("../../assets/quran-open.png")}
          style={styles.quranImage}
          resizeMode="contain"
        />
      </Animatable.View> */}

      {/* Card */}
      <Animatable.View animation="fadeInUp" delay={200} style={styles.infoCard}>
        {currentRuku ? (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.rukuText}>
                📖 Ruku {currentRuku.rukuIndex} / 540
              </Text>
              <Text style={styles.meta}>
                Surah:{" "}
                <Text style={styles.bold}>
                  {currentRuku.surahNameEnglish} ({currentRuku.surahNameArabic})
                </Text>
              </Text>
              <Text style={styles.meta}>
                Parah: <Text style={styles.bold}>{currentRuku.parah}</Text>
              </Text>
              <Text style={styles.meta}>
                Manzil: <Text style={styles.bold}>{currentRuku.manzil}</Text>
              </Text>
              <Text style={styles.meta}>
                Ayahs:{" "}
                <Text style={styles.bold}>
                  {currentRuku.ayahStart} - {currentRuku.ayahEnd}
                </Text>
              </Text>
            </Card.Content>
          </Card>
        ) : (
          <Text style={styles.meta}>Loading Quran data...</Text>
        )}
      </Animatable.View>

      {/* Progress Circle */}
      <Animatable.View
        animation="fadeInUp"
        delay={400}
        style={styles.progressWrapper}
      >
        <AnimatedCircularProgress
          size={160}
          width={10}
          fill={progress}
          tintColor="#2ecc71"
          backgroundColor="#2c3e50"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
          )}
        </AnimatedCircularProgress>
      </Animatable.View>

      {/* + / - Buttons */}
      <Animatable.View animation="fadeInUp" delay={600} style={styles.controls}>
        <Button
          mode="contained"
          onPress={decrement}
          style={[styles.button, { backgroundColor: "#e74c3c" }]}
        >
          <Text style={styles.iconText}>-</Text>
        </Button>
        <Button
          mode="contained"
          onPress={increment}
          style={[styles.button, { backgroundColor: "#27ae60" }]}
        >
          <Text style={styles.iconText}>+</Text>
        </Button>
      </Animatable.View>

      {/* Summary */}
      <Animatable.View
        animation="fadeInUp"
        delay={800}
        style={styles.summaryWrapper}
      >
        <Text style={styles.summary}>🔥 Streak: {streak} days</Text>
        <Text style={styles.summary}>📅 Today: {todayCount} Ruku(s)</Text>
        <Text style={styles.smallInfo}>
          Total Progress: {currentIndex} / 540 Rukus
        </Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e141b",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  quranImage: {
    width: 130,
    height: 130,
    marginBottom: 15,
  },
  infoCard: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#1c2833",
    borderWidth: 1,
    borderColor: "#2c3e50",
    paddingVertical: 8,
  },
  rukuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2ecc71",
    textAlign: "center",
  },
  meta: {
    fontSize: 16,
    color: "#bdc3c7",
    marginTop: 3,
    textAlign: "center",
  },
  bold: {
    fontWeight: "600",
    color: "#ecf0f1",
  },
  progressWrapper: {
    alignItems: "center",
    marginVertical: 15,
  },
  progressText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ecf0f1",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    marginVertical: 20,
  },
  button: {
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
  },
  summaryWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  summary: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ecf0f1",
    textAlign: "center",
  },
  smallInfo: {
    fontSize: 15,
    color: "#95a5a6",
    textAlign: "center",
    marginTop: 4,
  },
});
