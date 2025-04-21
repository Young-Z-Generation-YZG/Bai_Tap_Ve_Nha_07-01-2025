import 'package:admin_flutter/widgets/form/input-field.widget.dart';
import 'package:admin_flutter/widgets/form/selector-field.widget.dart';
import 'package:flutter/cupertino.dart';

class TestPage extends StatefulWidget {
  const TestPage({super.key});

  @override
  State<TestPage> createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  late TextEditingController firstNameController;

  @override
  void initState() {
    super.initState();
    firstNameController = TextEditingController(text: "Foo Bar init");
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Edit Product'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text(
            'Save',
            style: TextStyle(
              color: CupertinoColors.activeBlue,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          children: [
            _buildFormGroup([
              InputField(
                label: "First Name",
                textController: firstNameController,
              ),
              InputField(
                label: "Last Name",
                textController: firstNameController,
              ),
              SelectorField(
                label: "Gender",
                selectedValue: "Male",
                options: ["Male", "Female"],
                onChanged: (value) {},
              ),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _buildFormGroup(List<Widget> children) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(children: children),
    );
  }
}
