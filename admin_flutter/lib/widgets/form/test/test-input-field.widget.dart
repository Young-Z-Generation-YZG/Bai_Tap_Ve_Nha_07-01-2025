import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

enum InputFieldType {
  text,
  number,
  email,
  password,
  phone,
  multiline,
  search,
  date,
}

class InputField extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final InputFieldType type;
  final bool isRequired;
  final bool isEnabled;
  final bool autofocus;
  final int? maxLength;
  final int? minLines;
  final int? maxLines;
  final Widget? prefix;
  final Widget? suffix;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;
  final Function()? onTap;
  final List<TextInputFormatter>? inputFormatters;
  final TextInputAction? textInputAction;
  final TextCapitalization textCapitalization;
  final TextStyle? textStyle;

  const InputField({
    Key? key,
    this.label,
    this.placeholder,
    this.helperText,
    this.errorText,
    this.controller,
    this.focusNode,
    this.type = InputFieldType.text,
    this.isRequired = false,
    this.isEnabled = true,
    this.autofocus = false,
    this.maxLength,
    this.minLines,
    this.maxLines,
    this.prefix,
    this.suffix,
    this.onChanged,
    this.onSubmitted,
    this.onTap,
    this.inputFormatters,
    this.textInputAction,
    this.textCapitalization = TextCapitalization.none,
    this.textStyle,
  }) : super(key: key);

  @override
  State<InputField> createState() => _InputFieldState();
}

class _InputFieldState extends State<InputField> {
  late bool _isPasswordVisible;
  bool _hasFocus = false;

  @override
  void initState() {
    super.initState();
    _isPasswordVisible = widget.type != InputFieldType.password;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Label
        if (widget.label != null) ...[
          Row(
            children: [
              Text(
                widget.label!,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  color: CupertinoColors.black,
                ),
              ),
              if (widget.isRequired)
                Text(
                  ' *',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: CupertinoColors.systemRed,
                  ),
                ),
            ],
          ),
          SizedBox(height: 8),
        ],

        // Input field
        Focus(
          onFocusChange: (hasFocus) {
            setState(() {
              _hasFocus = hasFocus;
            });
          },
          child: CupertinoTextField(
            controller: widget.controller,
            focusNode: widget.focusNode,
            placeholder: widget.placeholder,
            enabled: widget.isEnabled,
            autofocus: widget.autofocus,
            maxLength: widget.maxLength,
            minLines:
                widget.type == InputFieldType.multiline
                    ? widget.minLines ?? 3
                    : widget.minLines,
            maxLines:
                widget.type == InputFieldType.multiline
                    ? widget.maxLines ?? 5
                    : (widget.type == InputFieldType.password
                        ? 1
                        : widget.maxLines),
            obscureText:
                !_isPasswordVisible && widget.type == InputFieldType.password,
            keyboardType: _getKeyboardType(),
            textInputAction: widget.textInputAction,
            textCapitalization: widget.textCapitalization,
            style:
                widget.textStyle ??
                TextStyle(color: CupertinoColors.black, fontSize: 16),
            inputFormatters: widget.inputFormatters ?? _getInputFormatters(),
            onChanged: widget.onChanged,
            onSubmitted: widget.onSubmitted,
            onTap: widget.onTap,
            prefix:
                widget.prefix != null
                    ? Padding(
                      padding: EdgeInsets.only(left: 10),
                      child: widget.prefix,
                    )
                    : _getDefaultPrefix(),
            suffix:
                widget.suffix != null
                    ? Padding(
                      padding: EdgeInsets.only(right: 10),
                      child: widget.suffix,
                    )
                    : _getDefaultSuffix(),
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color:
                  widget.isEnabled
                      ? CupertinoColors.systemGrey6
                      : CupertinoColors.systemGrey5,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: _getBorderColor(), width: 1.5),
            ),
          ),
        ),

        // Helper text or error text
        if (widget.errorText != null || widget.helperText != null) ...[
          SizedBox(height: 6),
          Text(
            widget.errorText ?? widget.helperText ?? '',
            style: TextStyle(
              fontSize: 12,
              color:
                  widget.errorText != null
                      ? CupertinoColors.systemRed
                      : CupertinoColors.systemGrey,
            ),
          ),
        ],
      ],
    );
  }

  // Get keyboard type based on input field type
  TextInputType _getKeyboardType() {
    switch (widget.type) {
      case InputFieldType.email:
        return TextInputType.emailAddress;
      case InputFieldType.number:
        return TextInputType.number;
      case InputFieldType.phone:
        return TextInputType.phone;
      case InputFieldType.multiline:
        return TextInputType.multiline;
      case InputFieldType.search:
        return TextInputType.text;
      default:
        return TextInputType.text;
    }
  }

  // Get input formatters based on input field type
  List<TextInputFormatter>? _getInputFormatters() {
    if (widget.type == InputFieldType.number) {
      return [FilteringTextInputFormatter.digitsOnly];
    } else if (widget.type == InputFieldType.phone) {
      return [FilteringTextInputFormatter.digitsOnly];
    }
    return null;
  }

  // Get default prefix icon based on input field type
  Widget? _getDefaultPrefix() {
    IconData? iconData;

    switch (widget.type) {
      case InputFieldType.email:
        iconData = CupertinoIcons.mail;
        break;
      case InputFieldType.password:
        iconData = CupertinoIcons.lock;
        break;
      case InputFieldType.phone:
        iconData = CupertinoIcons.phone;
        break;
      case InputFieldType.search:
        iconData = CupertinoIcons.search;
        break;
      case InputFieldType.date:
        iconData = CupertinoIcons.calendar;
        break;
      default:
        return null;
    }

    if (iconData != null) {
      return Padding(
        padding: EdgeInsets.only(left: 10),
        child: Icon(iconData, color: CupertinoColors.systemGrey, size: 18),
      );
    }

    return null;
  }

  // Get default suffix icon based on input field type
  Widget? _getDefaultSuffix() {
    if (widget.type == InputFieldType.password) {
      return GestureDetector(
        onTap: () {
          setState(() {
            _isPasswordVisible = !_isPasswordVisible;
          });
        },
        child: Padding(
          padding: EdgeInsets.only(right: 10),
          child: Icon(
            _isPasswordVisible ? CupertinoIcons.eye_slash : CupertinoIcons.eye,
            color: CupertinoColors.systemGrey,
            size: 18,
          ),
        ),
      );
    } else if (widget.type == InputFieldType.date) {
      return Padding(
        padding: EdgeInsets.only(right: 10),
        child: Icon(
          CupertinoIcons.chevron_down,
          color: CupertinoColors.systemGrey,
          size: 18,
        ),
      );
    }

    return null;
  }

  // Get border color based on field state
  Color _getBorderColor() {
    if (widget.errorText != null) {
      return CupertinoColors.systemRed;
    } else if (_hasFocus) {
      return Color(0xFF9747FF); // Purple accent color
    } else {
      return CupertinoColors.systemGrey5;
    }
  }
}

// Form Field Group Widget (Optional)
class FormFieldGroup extends StatelessWidget {
  final String title;
  final List<Widget> fields;
  final bool isCollapsible;
  final bool initiallyExpanded;

  const FormFieldGroup({
    Key? key,
    required this.title,
    required this.fields,
    this.isCollapsible = false,
    this.initiallyExpanded = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (isCollapsible) {
      return Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          title: Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: CupertinoColors.black,
            ),
          ),
          initiallyExpanded: initiallyExpanded,
          tilePadding: EdgeInsets.symmetric(horizontal: 0),
          children: [
            Padding(
              padding: EdgeInsets.only(bottom: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: fields,
              ),
            ),
          ],
        ),
      );
    } else {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 16),
          ...fields,
        ],
      );
    }
  }
}

// Date Input Field Widget (Optional)
class DateInputField extends StatelessWidget {
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final TextEditingController controller;
  final bool isRequired;
  final bool isEnabled;
  final DateTime? initialDate;
  final DateTime? minimumDate;
  final DateTime? maximumDate;
  final Function(DateTime)? onDateSelected;

  const DateInputField({
    Key? key,
    this.label,
    this.placeholder,
    this.helperText,
    this.errorText,
    required this.controller,
    this.isRequired = false,
    this.isEnabled = true,
    this.initialDate,
    this.minimumDate,
    this.maximumDate,
    this.onDateSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InputField(
      label: label,
      placeholder: placeholder ?? 'Select date',
      helperText: helperText,
      errorText: errorText,
      controller: controller,
      type: InputFieldType.date,
      isRequired: isRequired,
      isEnabled: isEnabled,
      onTap: () {
        if (isEnabled) {
          _showDatePicker(context);
        }
      },
    );
  }

  void _showDatePicker(BuildContext context) async {
    // Calculate the initial date
    final DateTime initialDateTime =
        initialDate ?? DateTime.tryParse(controller.text) ?? DateTime.now();

    await showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: 300,
          color: CupertinoColors.systemBackground,
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
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              ),
              Expanded(
                child: CupertinoDatePicker(
                  mode: CupertinoDatePickerMode.date,
                  initialDateTime: initialDateTime,
                  minimumDate: minimumDate,
                  maximumDate: maximumDate,
                  onDateTimeChanged: (DateTime newDate) {
                    // Format the date as a string (YYYY-MM-DD)
                    final formattedDate =
                        '${newDate.year}-${newDate.month.toString().padLeft(2, '0')}-${newDate.day.toString().padLeft(2, '0')}';
                    controller.text = formattedDate;

                    if (onDateSelected != null) {
                      onDateSelected!(newDate);
                    }
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
