import 'package:admin_flutter/auth/login.page.dart';
import 'package:admin_flutter/main.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:admin_flutter/dashboards/users.page.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => UIProvider())],
      child: const MyApp(),
    ),
  );
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
      home: MainPage(),
      onGenerateRoute: (settings) {
        if (settings.name == '/users') {
          // Hide bottom bar when navigating to Users page
          Provider.of<UIProvider>(
            context,
            listen: false,
          ).setBottomBarVisibility(false);

          return CupertinoPageRoute(
            fullscreenDialog: true,
            builder:
                (context) => CupertinoPageScaffold(
                  navigationBar: CupertinoNavigationBar(
                    middle: Text('Users'),
                    backgroundColor: Color(0xFFf6f6f6),
                    border: null,
                    leading: CupertinoButton(
                      padding: EdgeInsets.zero,
                      child: Text(
                        'Close',
                        style: TextStyle(
                          color: CupertinoColors.activeBlue,
                          fontSize: 17,
                        ),
                      ),
                      onPressed: () {
                        // Restore bottom bar visibility when returning
                        Provider.of<UIProvider>(
                          context,
                          listen: false,
                        ).setBottomBarVisibility(true);
                        Navigator.of(context).pop();
                      },
                    ),
                  ),
                  child: UserPage(),
                ),
          );
        }
        return null;
      },
    );
  }
}
