import 'dart:convert';

import 'package:admin_flutter/config/appConfig.dart';
import 'package:admin_flutter/onboarding.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:get_it/get_it.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';
import 'package:admin_flutter/services/socket.service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await loadConfig();
  registerHTTPService();

  // Initialize SocketService
  SocketService socketService = SocketService();
  socketService.initializeSocket();

  runApp(
    MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => UIProvider())],
      child: const MyApp(),
    ),
  );
}

Future<void> loadConfig() async {
  String _configContent = await rootBundle.loadString(
    "assets/config/config.json",
  );
  Map _configData = jsonDecode(_configContent);

  GetIt.instance.registerSingleton<AppConfig>(
    AppConfig(API_URL: _configData["API_URL"]),
  );

  GetIt.instance.registerSingleton<SocketService>(SocketService());
}

void registerHTTPService() {
  GetIt.instance.registerSingleton<HttpService>(HttpService());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'Admin Flutter',
      theme: CupertinoThemeData(
        primaryColor: CupertinoColors.activeBlue,
        scaffoldBackgroundColor: Color(0xFFf6f6f6),
      ),
      home: OnBoardingView(),
    );
  }
}
