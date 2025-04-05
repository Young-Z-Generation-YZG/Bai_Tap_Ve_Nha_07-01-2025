import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class VoucherPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return VoucherPageState();
  }
}

class VoucherPageState extends State<VoucherPage> {
  double? _deviceWidth, _deviceHeight;

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(child: Column(children: []));
  }
}
