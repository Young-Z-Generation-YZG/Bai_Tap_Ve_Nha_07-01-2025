import 'package:admin_flutter/pages/dashboards/invoices.page.dart';
import 'package:admin_flutter/pages/dashboards/overview.page.dart';
import 'package:admin_flutter/pages/dashboards/products.page.dart';
import 'package:admin_flutter/pages/dashboards/users.page.dart';
import 'package:admin_flutter/pages/dashboards/vouchers.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';

class HomePage extends StatelessWidget {
  late double _deviceWidth;
  late double _deviceHeight;
  late double _safeAreaHeight;

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;
    _safeAreaHeight =
        _deviceHeight -
        MediaQuery.of(context).padding.top -
        MediaQuery.of(context).padding.bottom;

    return CupertinoPageScaffold(
      backgroundColor: Color(0xFFf6f6f6),
      child: SafeArea(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: _deviceWidth * 0.05),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _headerText("Home"),
              SizedBox(height: 16),
              _favoritesList(context),
              SizedBox(height: 16),
              _dashboardsList(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _headerText(String text) {
    return Text(
      text,
      style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
    );
  }

  Widget _dashboardsList(BuildContext context) {
    return Container(
      height: _safeAreaHeight * 0.60,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Column(
          children: [
            _listItem(
              context,
              CupertinoIcons.chart_pie,
              "Overview",
              OverviewPage(),
            ),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(
              context,
              CupertinoIcons.shopping_cart,
              "Products",
              ProductPage(),
            ),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(
              context,
              CupertinoIcons.ticket,
              "Vouchers",
              VoucherPage(),
            ),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(context, CupertinoIcons.person_2, "Users", UserPage()),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(
              context,
              CupertinoIcons.doc_text,
              "Invoices",
              InvoicePage(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _favoritesList(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          _listItem(
            context,
            CupertinoIcons.folder_fill,
            "My Projects",
            InvoicePage(),
          ),
          Divider(height: 1, color: Colors.grey.withAlpha(51)),
          _listItem(context, CupertinoIcons.person_2_fill, "Users", UserPage()),
          Divider(height: 1, color: Colors.grey.withAlpha(51)),
          _listItem(
            context,
            CupertinoIcons.money_dollar_circle_fill,
            "Billing",
            InvoicePage(),
          ),
        ],
      ),
    );
  }

  Widget _listItem(
    BuildContext context,
    IconData icon,
    String text,
    Widget page,
  ) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () {
        if (text == "Users") {
          // Update bottom bar visibility state
          Provider.of<UIProvider>(
            context,
            listen: false,
          ).setBottomBarVisibility(false);

          // Using rootNavigator: true is crucial here to bypass the CupertinoTabView's Navigator
          // and access the root Navigator. This ensures that the Users page appears on top of the
          // entire app (including the tab bar) rather than just within the current tab's Navigator.
          // This approach allows us to completely hide the bottom tab bar for this screen.
          Navigator.of(context, rootNavigator: true).pushNamed('/users');
        } else {
          // For regular navigation within tabs, we use the standard Navigator.push
          // which navigates within the current tab's Navigator stack
          Navigator.push(
            context,
            CupertinoPageRoute(builder: (context) => page),
          );
        }
      },
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            Icon(icon, color: Colors.black, size: 24),
            SizedBox(width: 12),
            Text(text, style: TextStyle(color: Colors.black, fontSize: 16)),
            Spacer(),
            Icon(CupertinoIcons.chevron_right, color: Colors.grey, size: 20),
          ],
        ),
      ),
    );
  }
}
