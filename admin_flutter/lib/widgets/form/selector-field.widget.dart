import 'package:admin_flutter/pages/dashboards/orders/order-details.page.dart';
import 'package:flutter/cupertino.dart';

class SelectorField extends StatefulWidget {
  final String? label;
  final bool? disabled;
  final String? selectedValue;
  final List<String> options;
  final Function(String) onChanged;

  const SelectorField({
    super.key,
    this.label,
    this.disabled = false,
    this.selectedValue,
    required this.options,
    required this.onChanged,
  });

  @override
  State<SelectorField> createState() => _SelectorFieldState();
}

class _SelectorFieldState extends State<SelectorField> {
  @override
  Widget build(BuildContext context) {
    // Add debug print to see what's happening
    print(
      "SelectorField build - label: ${widget.label}, selectedValue: ${widget.selectedValue}",
    );

    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed:
          widget.disabled == true
              ? null
              : () {
                _showSelectionModal(
                  context,
                  widget.label ?? '',
                  widget.selectedValue ?? '',
                  widget.options,
                  widget.onChanged,
                );
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
              widget.label ?? '',
              style: TextStyle(
                color: CupertinoColors.black,
                fontSize: 17,
                fontWeight: FontWeight.normal,
              ),
            ),
            Row(
              children: [
                Text(
                  widget.selectedValue == null
                      ? ''
                      : widget.selectedValue!.capitalize(),
                  style: TextStyle(
                    color:
                        widget.disabled == true
                            ? CupertinoColors.systemGrey
                            : CupertinoColors.black,
                    fontSize: 17,
                  ),
                ),
                SizedBox(width: 8),
                Icon(
                  CupertinoIcons.chevron_down,
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

  void _showSelectionModal(
    BuildContext context,
    String label,
    String currentValue,
    List<String> options,
    Function(String) onChanged,
  ) {
    String tempSelection = currentValue;

    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 250,
          padding: EdgeInsets.only(top: 6.0),
          margin: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          color: CupertinoColors.systemBackground,
          child: SafeArea(
            top: false,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    CupertinoButton(
                      child: Text('Cancel'),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                    CupertinoButton(
                      child: Text('Done'),
                      onPressed: () {
                        onChanged(tempSelection);
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                ),
                Expanded(
                  child: CupertinoPicker(
                    scrollController: FixedExtentScrollController(
                      initialItem: options.indexOf(currentValue),
                    ),
                    magnification: 1.22,
                    squeeze: 1.2,
                    useMagnifier: true,
                    itemExtent: 32.0,
                    onSelectedItemChanged: (int selectedItem) {
                      tempSelection = options[selectedItem];
                    },
                    children: List<Widget>.generate(options.length, (
                      int index,
                    ) {
                      return Center(
                        child: Text(
                          options[index],
                          style: TextStyle(fontSize: 16),
                        ),
                      );
                    }),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
