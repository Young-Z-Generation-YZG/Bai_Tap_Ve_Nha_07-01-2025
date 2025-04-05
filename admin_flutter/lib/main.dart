import 'package:admin_flutter/auth/login.page.dart';
import 'package:admin_flutter/main.page.dart';
import 'package:flutter/cupertino.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Clothing Store',
      initialRoute: '/home',
      routes: {"/": (context) => LoginPage(), "/home": (context) => MainPage()},
    );
  }
}
