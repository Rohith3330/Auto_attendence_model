import 'dart:convert';

import 'package:attendance/second_screen.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await dotenv.load(
    fileName: ".env",
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.light(),
      home: const MyHomePage(title: 'Students Attendence'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  TextEditingController controller = TextEditingController();
  bool loading = false;
  String img = "";
  Future<String> getimg(String name) async {
    setState(() {
      loading = true;
    });
    var headers = {'content-type': 'multipart/form-data'};
    var key=dotenv.env["API_URL"];
    var request = http.Request(
        'GET',
        Uri.parse(
            '$key$name'));

    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      String x = jsonDecode(await response.stream.bytesToString())['image'];
      // print("x= $x");
      return x;
    } else {
      print(response.reasonPhrase);
    }
    return "";
  }

  @override
  Widget build(BuildContext context) {
    return loading
        ? Scaffold(
          appBar: AppBar(
            title: const Text('Attendance'),
          ),
            body: const Center(
              child: CircularProgressIndicator.adaptive(
                backgroundColor: Colors.white,
              ),
            ),
          )
        : Scaffold(
            resizeToAvoidBottomInset: false,
            appBar: AppBar(
              title: Text(widget.title),
              actions: <Widget>[
                IconButton(
                  icon: const Icon(
                    Icons.person,
                    color: Colors.white,
                  ),
                  onPressed: () {},
                )
              ],
            ),
            body: Center(
                child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                  // mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const SizedBox(
                      height: 150,
                    ),
                    const Text(
                      'Enter Roll No : ',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(
                      height: 50,
                    ),
                    // (
                    Container(
                      // color: Colors.black,
                      height: 100,
                      child: TextField(
                        controller: controller,
                        // keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30.0),
                            ),
                            filled: true,
                            hintStyle: TextStyle(color: Colors.grey[800]),
                            hintText: "Roll No",
                            fillColor: Colors.white70),
                      ),
                    ),
                    // ),
                    Padding(
                      padding: const EdgeInsets.only(left: 80),
                      child: SizedBox(
                        width: 200,
                        height: 50,
                        child: TextButton(
                          onPressed: () async {
                            String n = "";
                            print(controller.text);
                            FirebaseFirestore.instance
                                .collection('students')
                                .where("id",
                                    isEqualTo: int.parse(controller.text))
                                .get()
                                .then((QuerySnapshot querySnapshot) {
                              querySnapshot.docs.forEach((doc) async {
                                print(doc["name"]);
                                n = await getimg(doc['name']);
                                print("n = $n");
                                // ignore: use_build_context_synchronously
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => Second(
                                            id: controller.text, img: n)));
                                setState(() {
                                  loading = false;
                                });
                              });
                            });
                            // ignore: use_build_context_synchronously
                            print("n = $n");
                            // await Navigator.push(
                            //     context,
                            //     MaterialPageRoute(
                            //         builder: (context) =>
                            //             Second(id: controller.text, img: n)));
                          },
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.blue,
                          ),
                          child: const Text(
                            'Submit',
                            style: TextStyle(color: Colors.white, fontSize: 20),
                          ),
                        ),
                      ),
                    )
                  ]),
            )));
  }
}
