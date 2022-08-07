/// {% extends "cards/base_back.js" %}
/// {% import "cards/pa_sent/common.js" as js_common with context %}



/// {% block js_functions %}
  {{ super() }}
  {{ js_common.functions }}
/// {% endblock %}


/// {% block js_keybind_settings %}
  {{ super() }}
  {{ js_common.keybind_settings }}
/// {% endblock %}


/// {% block js_run %}
  {{ super() }}
  {{ js_common.run }}
/// {% endblock %}
