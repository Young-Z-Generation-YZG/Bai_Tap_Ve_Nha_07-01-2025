import 'package:admin_flutter/tabs/home.page.dart';
import 'package:admin_flutter/tabs/notify.page.dart';
import 'package:admin_flutter/tabs/profile.page.dart';
import 'package:admin_flutter/tabs/settings.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _mainPageState();
  }
}

class _mainPageState extends State<MainPage> {
  final List<Widget> _pages = [
    HomePage(),
    NotifyPage(),
    SettingsPage(),
    ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
      tabBar: CupertinoTabBar(
        backgroundColor: Color(0xFFf6f6f6),
        border: null,
        items: const [
          BottomNavigationBarItem(icon: Icon((CupertinoIcons.home))),
          BottomNavigationBarItem(icon: Icon((CupertinoIcons.bell_circle))),
          BottomNavigationBarItem(icon: Icon((CupertinoIcons.settings))),
          BottomNavigationBarItem(icon: Icon((CupertinoIcons.profile_circled))),
        ],
      ),
      tabBuilder: (context, index) {
        return CupertinoTabView(
          builder: (context) {
            return CupertinoPageScaffold(
              backgroundColor: Color(0xFFf6f6f6),
              navigationBar:
                  index == 0
                      ? null
                      : const CupertinoNavigationBar(
                        middle: Text("IBMI"),
                        backgroundColor: Color(0xFFf6f6f6),
                        automaticBackgroundVisibility: false,
                      ),
              child: _pages[index],
            );
          },
        );
      },
    );
  }
}
