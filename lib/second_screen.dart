import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class Second extends StatefulWidget {
  String id, img;
  Second({super.key, required this.id, required this.img});
  @override
  State<Second> createState() => _SecondState(id, img);
}

class _SecondState extends State<Second> {
  String id, img;
  _SecondState(this.id, this.img);
  @override
  Widget build(BuildContext context) {
    // print("img = $img");
    return Scaffold(
        appBar: AppBar(
          title: const Text('Attendance'),
        ),
        body: Center(
          child: StreamBuilder(
              stream: FirebaseFirestore.instance
                  .collection('students')
                  .where('id', isEqualTo: int.parse(id))
                  .snapshots(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator.adaptive(
                      backgroundColor: Colors.white,
                    ),
                  );
                } else if ((snapshot.data! as dynamic).docs.length == 0) {
                  return const Center(
                    child: Text(
                      'No user',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  );
                }
                DocumentSnapshot snap = (snapshot.data! as dynamic).docs[0];
                // Future<String> img1 = getimg(snap['name']);
                return Column(
                  children: [
                    SizedBox(
                      height: MediaQuery.of(context).size.width / 6,
                    ),
                    Container(
                      width: 256,
                      height: 256,
                      child: Image.memory(
                        base64Decode(img),
                        // fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(height: 20,),
                    
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: const [
                            Text(
                              'Name ',
                              style: TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),
                            ),
                            Text('Roll No ',
                              style: TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),),
                            Text('Email',
                              style: TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),),
                            // Text('Name :'),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              ': ${snap['name']}',
                              style: const TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),
                              // style: ,
                            ),
                            Text(': ${snap['id']}',
                              style: const TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),),
                            Text(': ${snap['email']}',
                              style: const TextStyle(
                                fontSize: 25,
                                fontWeight: FontWeight.bold
                              ),),
                            // Text('Name :'),
                          ],
                        )
                      ],
                    ),
                    SizedBox(height: 20,),
                    Center(
                      child: FutureBuilder(
                        future: FirebaseFirestore.instance
                            .collection('attendance')
                            .get(),
                        builder: (context, snapshot) {
                          if (!snapshot.hasData) {
                            return Container();
                          }
                          return ListView.builder(
                            shrinkWrap: true,
                            itemCount: snapshot.data?.docs.length,
                            itemBuilder: (context, index) {
                              var x = '1'
                                  .allMatches(snapshot.data?.docs[index]
                                      .data()['students'][id])
                                  .length;
                              String l = '🟢';
                              if (x < 3) l = '🔴';
                              return Column(
                                children: [
                                  Center(
                                    child: Text(
                                      '${snapshot.data?.docs[index].data()['subject']}    $l',
                                  style: const TextStyle(
                                    fontSize: 25,
                                    fontWeight: FontWeight.bold
                                  ),
                                    ),
                                  ),
                                  const SizedBox(height: 20,),
                                ],
                              );
                            },
                          );
                        },
                      ),
                    ),
                  ],
                );
              }),
        ));
  }
}
