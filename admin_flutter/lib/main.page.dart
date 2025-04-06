import 'package:admin_flutter/tabs/home.page.dart';
import 'package:admin_flutter/tabs/notify.page.dart';
import 'package:admin_flutter/tabs/profile.page.dart';
import 'package:admin_flutter/tabs/settings.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';

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

  // Track the current selected tab
  int _currentIndex = 0;
  // Track the last time the home tab was tapped
  DateTime? _lastHomeTabTap;

  @override
  void initState() {
    super.initState();
    _initPreferences();
  }

  Future<void> _initPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    // Initialize preferences as needed
  }

  @override
  Widget build(BuildContext context) {
    // Get bottom bar visibility from provider
    final hideBottomBar = Provider.of<UIProvider>(context).hideBottomBar;

    return CupertinoTabScaffold(
      tabBar:
          hideBottomBar
              ? CupertinoTabBar(
                activeColor: Colors.transparent,
                backgroundColor: Colors.transparent,
                border: const Border(
                  top: BorderSide(color: Colors.transparent),
                ),
                height: 0, // Minimum height to hide it visually
                items: const [
                  // Need at least 2 items to satisfy Apple's HIG
                  BottomNavigationBarItem(icon: SizedBox.shrink(), label: ''),
                  BottomNavigationBarItem(icon: SizedBox.shrink(), label: ''),
                ],
              )
              : CupertinoTabBar(
                backgroundColor: Color(0xFFf6f6f6),
                border: null,
                currentIndex: _currentIndex,
                onTap: (index) {
                  // Check if this is a tap on the Home tab (index 0)
                  if (index == 0) {
                    final now = DateTime.now();

                    // If we're already on the home tab and it was tapped recently (within 500ms)
                    if (_currentIndex == 0 &&
                        _lastHomeTabTap != null &&
                        now.difference(_lastHomeTabTap!).inMilliseconds < 500) {
                      // Double tap detected - navigate to the root of the home page
                      // or refresh the home page
                      Navigator.of(
                        context,
                        rootNavigator: true,
                      ).pushAndRemoveUntil(
                        CupertinoPageRoute(builder: (context) => MainPage()),
                        (route) => false,
                      );
                    }

                    // Update the last tap time
                    _lastHomeTabTap = now;
                  }

                  // Update the current index
                  setState(() {
                    _currentIndex = index;
                  });
                },
                items: const [
                  BottomNavigationBarItem(
                    icon: Icon(CupertinoIcons.home),
                    label: 'Home',
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(CupertinoIcons.bell_circle),
                    label: 'Notify',
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(CupertinoIcons.settings),
                    label: 'Settings',
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(CupertinoIcons.profile_circled),
                    label: 'Profile',
                  ),
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
