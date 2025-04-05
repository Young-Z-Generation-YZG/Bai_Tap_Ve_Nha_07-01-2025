import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CardWrapper extends StatelessWidget {
  final double width;
  final double height;
  final Widget child;
  final Color backgroundColor;

  const CardWrapper({
    required this.width,
    required this.height,
    required this.child,
    this.backgroundColor = Colors.white,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment(1.2, 3),
          end: Alignment(1, 0),
          colors: [Color(0xFFF6F6F6), backgroundColor],
        ),
        borderRadius: BorderRadius.circular(10),
        boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 5)],
      ),
      child: child,
    );
  }
}
