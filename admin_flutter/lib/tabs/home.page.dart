import 'package:admin_flutter/pages/dashboards/orders/orders-list-v2.page.dart';
import 'package:admin_flutter/pages/dashboards/orders/orders.page.dart';
import 'package:admin_flutter/pages/dashboards/overviews/overview.page.dart';
import 'package:admin_flutter/pages/dashboards/products/products.page.dart';
import 'package:admin_flutter/pages/dashboards/promotions/promotions.page.dart';
import 'package:admin_flutter/pages/dashboards/users/user-statistics.page.dart';
import 'package:admin_flutter/pages/dashboards/users/users.page.dart';
import 'package:admin_flutter/pages/dashboards/users/users-v2.page.dart';
import 'package:admin_flutter/pages/dashboards/vouchers/vouchers.page.dart';
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
            _listItem(
              context,
              CupertinoIcons.tickets,
              "Promotions",
              PromotionPage(),
            ),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(context, CupertinoIcons.person_3, "Users", UsersPageV2()),
            Divider(height: 1, color: Colors.grey.withAlpha(51)),
            _listItem(
              context,
              CupertinoIcons.doc_text,
              "Orders",
              OrdersListV2Page(),
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
            OrdersPage(),
          ),
          Divider(height: 1, color: Colors.grey.withAlpha(51)),
          _listItem(context, CupertinoIcons.person_2_fill, "Users", UserPage()),
          Divider(height: 1, color: Colors.grey.withAlpha(51)),
          _listItem(
            context,
            CupertinoIcons.money_dollar_circle_fill,
            "Billing",
            OrdersPage(),
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
        Navigator.push(context, CupertinoPageRoute(builder: (context) => page));
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
