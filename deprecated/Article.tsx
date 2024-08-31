import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";

// Deprecated (keeping it for the memes)
function Article(article: any) {
  
  return (
    <View style={styles.ArticleContainer}>
      <View>
        <Text style={styles.Title}>

        </Text>
      </View>

      <View>
        <Text style={styles.Context}>
          In Bali, a dream team of young developers and entrepreneurs decided to
          solve a terrible problem.
        </Text>
      </View>

      <View>
        <Text style={styles.Article}>
          They were a quirky bunch: Raphaël, the web developer who was secretly
          an amazing dancer; Zoe, the brilliant UX designer with a knack for
          playing pranks; and Max, the coding genius who could solve any problem
          with a cup of coffee and a pun. They met during a tech retreat, where
          they bonded over their mutual love for coding and their disdain for
          forgetfulness.
        </Text>
        <Text style={styles.Article}>
          One night, after an intense brainstorming session (and a bit too much
          Balinese coffee), they had a eureka moment. "What if we could create
          an app that helps people remember things in a fun and engaging way?"
          And thus, Memo was born.
        </Text>
        <Text style={styles.Article}>
          They worked day and night, coding, designing, and dancing (thanks to
          Raphaël) to bring their vision to life. Memo quickly became more than
          just an app; it was a testament to their friendship and shared dream.
          With Memo, users could create and share interactive flashcards, making
          learning and remembering fun and easy.
        </Text>
        <Text style={styles.Article}>
          As Memo's popularity grew, so did the stories of how it helped people.
          From students acing their exams to grandparents remembering their
          grandkids' birthdays, Memo was making a difference. And the dream
          team? They continued to innovate, dance, and, most importantly, have
          fun.
        </Text>
        <Text style={styles.Article}>
          So, the next time you use Memo, remember the quirky team in Bali who
          believed in the power of memory and friendship. And maybe, just maybe,
          do a little dance in honor of Raphaël.
        </Text>
      </View>
    </View>
  );
}

export default Article;

const styles = StyleSheet.create({
  ArticleContainer: {
    flex: 1,
    backgroundColor: Colors.black1,
    margin: 10,
    marginTop: 40,
  },
  dateNauthor: {
    flex: 1,
    fontSize: 15,
    justifyContent: "flex-start",
    marginLeft: 50,
    color: Colors.white1,
  },
  Title: {
    fontSize: 40,
    color: Colors.white1,
  },
  Context: {
    fontSize: 25,
    fontStyle: "italic",
    color: Colors.white1,
  },
  Article: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: Colors.white1,
  },
});
