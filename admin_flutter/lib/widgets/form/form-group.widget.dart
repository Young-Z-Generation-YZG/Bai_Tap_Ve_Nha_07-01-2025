import 'package:flutter/cupertino.dart';

class FormGroup extends StatelessWidget {
  final List<Widget> children;
  final String? title;

  const FormGroup({super.key, required this.children, this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          if (title != null)
            Text(
              title!,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ...children,
        ],
      ),
    );
  }
}
