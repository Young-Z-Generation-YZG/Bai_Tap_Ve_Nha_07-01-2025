import 'package:admin_flutter/pages/dashboards/orders/order-details.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class InputField extends StatefulWidget {
  final TextEditingController textController;
  final String? label;
  final TextInputType? keyboardType;
  final bool? disabled;
  final TextStyle? labelStyle;
  final TextStyle? valueStyle;
  final bool? showChevron;
  const InputField({
    super.key,
    required this.textController,
    this.label,
    this.disabled = false,
    this.keyboardType,
    this.labelStyle,
    this.valueStyle,
    this.showChevron = true,
  });

  @override
  State<InputField> createState() => _InputFieldState();
}

class _InputFieldState extends State<InputField> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildFormField(
          widget.label ?? 'Error: No label provided',
          widget.textController,
        ),
      ],
    );
  }

  Widget _buildFormField(
    String label,
    TextEditingController controller, {
    TextInputType keyboardType = TextInputType.text,
  }) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed:
          widget.disabled == true
              ? null
              : () => {
                _showEditModel(context, label, controller, keyboardType),
              },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style:
                  widget.labelStyle ??
                  TextStyle(
                    color: CupertinoColors.black,
                    fontSize: 17,
                    fontWeight: FontWeight.normal,
                  ),
            ),
            Row(
              children: [
                Text(
                  controller.text.isEmpty ? '' : controller.text.capitalize(),
                  style:
                      widget.valueStyle ??
                      TextStyle(
                        color:
                            widget.disabled == true
                                ? CupertinoColors.systemGrey
                                : CupertinoColors.black,
                        fontSize: 17,
                      ),
                ),
                SizedBox(width: 8),
                if (widget.showChevron == true)
                  Icon(
                    CupertinoIcons.chevron_right,
                    color: CupertinoColors.systemGrey3,
                    size: 18,
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showEditModel(
    BuildContext context,
    String label,
    TextEditingController controller,
    TextInputType keyboardType,
  ) {
    final tempController = TextEditingController(text: controller.text);

    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 250,
          padding: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: CupertinoColors.systemBackground,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Cancel'),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  Text(
                    label,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text('Save'),
                    onPressed: () {
                      // Update the original controller
                      controller.text = tempController.text;
                      setState(() {});
                      Navigator.pop(context);
                    },
                  ),
                ],
              ),
              SizedBox(height: 16),
              Expanded(
                child: CupertinoTextField(
                  controller: tempController,
                  keyboardType: keyboardType,
                  maxLines: 1,
                  autofocus: true,
                  padding: EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    border: Border.all(color: CupertinoColors.systemGrey4),
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
