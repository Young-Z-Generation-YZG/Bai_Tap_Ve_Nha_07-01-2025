import 'package:flutter/foundation.dart';

class UIProvider with ChangeNotifier {
  bool _hideBottomBar = false;

  bool get hideBottomBar => _hideBottomBar;

  void setBottomBarVisibility(bool isVisible) {
    _hideBottomBar = !isVisible;
    notifyListeners();
  }
}
