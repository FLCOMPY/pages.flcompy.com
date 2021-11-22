// E-mail valitor
function validacaoEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(
    field.value.indexOf("@") + 1,
    field.value.length
  );

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    document.getElementById("msgemail").innerHTML = "E-mail válido";
    alert("E-mail valido");
  } else {
    document.getElementById("msgemail").innerHTML =
      "<font color='red'>E-mail inválido </font>";
    alert("E-mail invalido");
  }
}

// Number Validor
function mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}
function mtel(v) {
  v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
function id(el) {
  return document.getElementById(el);
}
window.onload = function () {
  id("celular").onkeyup = function () {
    mascara(this, mtel);
  };
};

// Mascara de Data

var before = "  /  /    ";
var cont = true;
var copied = false;

//A máscara realiza comparações de "antes" e "depois" no keydown e //keyup

function beforeDate(field, e) {
  var start = field.selectionStart;
  var end = field.selectionEnd;
  var key = e || window.event;
  key = key.keyCode;

  //Ações de ctrl+V, C ou X

  var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection
  if ((key == 86 || key == 65 || key == 67 || key == 88) && ctrl) {
    if (key == 86 || key == 88) {
      copied = true;
    }
    createSelection(field, 0, 10);
    return;
  }

  //Caso o usuário tenha selecionado parte da data
  //Preserva as barras e espaços

  if (start != end) {
    if (
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105) ||
      key == 8 ||
      key == 46 ||
      key == 32 ||
      (key == 86 && ctrl) ||
      (key == 67 && ctrl)
    ) {
      for (var i = start; i < end; i++) {
        if (field.value.charAt(i) != "/") {
          field.value =
            field.value.substring(0, i) +
            " " +
            field.value.substring(i + 1, 10);
        }
      }
      before = field.value;
      createSelection(
        field,
        field.value.indexOf(" "),
        field.value.indexOf(" ")
      );
      return false;
    } else if (key >= 37 && key <= 40) {
      return true;
    } else {
      return false;
    }
  }

  //Setas

  if (key >= 37 && key <= 40) {
    return true;
  } else if (key == 33) {
    createSelection(field, 0, 0);
    return;
  } else if (key == 34) {
    createSelection(field, field.value.length, field.value.length);
    return;
  } else if (
    (key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105) ||
    key == 46
  ) {
    //Executar a ação uma vez por tecla
    if (cont) {
      cont = false;
      if (field.value.charAt(2) != "/") {
        field.value = setCharAt(field.value, 2, "/");
      }
      if (field.value.charAt(5) != "/") {
        field.value = setCharAt(field.value, 5, "/");
      }
      createSelection(field, start, start);
      before = field.value;
      return;
    }
    return false;
  } else if (key == 8) {
    //Backspace pressionado
    if (start != 0) {
      if (field.value.charAt(start - 1) != "/") {
        before = field.value;
        field.value = setCharAt(field.value, start - 1, " ");
        createSelection(field, start - 1, start - 1);
        return false;
      } else {
        before = field.value;
        createSelection(field, start - 1, start - 1);
        return false;
      }
    }
  }
}

//Evento Keyup
function afterDate(field, e) {
  var key = e || window.event;
  key = key.keyCode;
  var after = field.value;
  var cursor = field.selectionStart;
  cont = true;

  //Caso o usuário tenha colado uma data
  if (copied) {
    putMaskAgain(field);
    copied = false;
  }

  if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 46)) {
    return false;
  } else {
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
      if (key >= 96) {
        key -= 48;
      }
      var char = String.fromCharCode(key);
      var aux = field.value.charAt(cursor);

      if (aux != " " && aux != "/" && field.value.charAt(cursor + 1) == " ") {
        field.value = setCharAt(field.value, cursor, char);
        field.value = setCharAt(field.value, cursor + 1, aux);
        return;
      }
      console.log(cursor);
      //Valida a entrada dos dias nas posições 0, 1 e 2
      switch (cursor) {
        case 0:
          if (char > 3) {
            field.value = setCharAt(field.value, 0, 0);
            field.value = setCharAt(field.value, 1, char);
            cursor += 3;
          } else {
            field.value = setCharAt(field.value, 0, char);
            cursor += 1;
          }
          break;
        case 1:
          if (field.value.charAt(0) == " ") {
            if (char > 3) {
              field.value = setCharAt(field.value, 0, 0);
              field.value = setCharAt(field.value, 1, char);
              cursor += 2;
            } else {
              field.value = setCharAt(field.value, 0, char);
            }
          } else {
            field.value = setCharAt(field.value, 1, char);
            cursor += 2;
          }
          break;
        case 2:
          if (field.value.charAt(0) == " " && field.value.charAt(1) == " ") {
            if (char > 3) {
              field.value = setCharAt(field.value, 0, 0);
              field.value = setCharAt(field.value, 1, char);
              cursor += 1;
            } else {
              field.value = setCharAt(field.value, 0, char);
            }
          } else if (
            field.value.charAt(0) != " " &&
            field.value.charAt(1) == " "
          ) {
            field.value = setCharAt(field.value, 1, char);
            cursor += 1;
          } else if (
            field.value.charAt(0) == " " &&
            field.value.charAt(1) != " "
          ) {
            if (char > 3) {
              field.value = setCharAt(field.value, 0, 0);
              cursor += 1;
            } else {
              field.value = setCharAt(field.value, 0, char);
            }
          } else {
            if (char > 1) {
              field.value = setCharAt(field.value, 3, 0);
              field.value = setCharAt(field.value, 4, char);
              cursor += 3;
            } else {
              field.value = setCharAt(field.value, 3, char);
              cursor += 2;
            }
          }
          break;
        //Valida entrada dos meses nas posições 3,4 e 5
        case 3:
          if (char > 1) {
            field.value = setCharAt(field.value, 3, 0);
            field.value = setCharAt(field.value, 4, char);
            cursor += 3;
          } else {
            field.value = setCharAt(field.value, 3, char);
            cursor += 1;
          }
          break;
        case 4:
          if (field.value.charAt(3) == " ") {
            if (char > 1) {
              field.value = setCharAt(field.value, 3, 0);
              field.value = setCharAt(field.value, 4, char);
              cursor += 2;
            } else {
              field.value = setCharAt(field.value, 3, char);
            }
          } else {
            field.value = setCharAt(field.value, 4, char);
            cursor += 2;
          }
          break;
        case 5:
          if (field.value.charAt(3) == " " && field.value.charAt(4) == " ") {
            if (char > 1) {
              field.value = setCharAt(field.value, 3, 0);
              field.value = setCharAt(field.value, 4, char);
              cursor += 1;
            } else {
              field.value = setCharAt(field.value, 4, char);
            }
          } else if (
            field.value.charAt(3) != " " &&
            field.value.charAt(4) == " "
          ) {
            field.value = setCharAt(field.value, 4, char);
            cursor += 1;
          } else if (
            field.value.charAt(3) == " " &&
            field.value.charAt(4) != " "
          ) {
            if (field.value.charAt(4) > 1) {
              field.value = setCharAt(field.value, 3, 0);
              cursor += 1;
            } else {
              field.value = setCharAt(field.value, 3, field.value.charAt(4));
              field.value = setCharAt(field.value, 4, char);
            }
          } else {
            field.value = setCharAt(field.value, 6, char);
            cursor += 2;
          }
          break;
        default:
          field.value = setCharAt(field.value, cursor, char);
          cursor += 1;
          break;
      }
      createSelection(field, cursor, cursor);
      return false;
    }

    //Delete pressionado
    if (key == 46) {
      var dropped = "undefined";

      for (var i = 0; i <= 9; i++) {
        if (before.charAt(i) != after.charAt(i)) {
          dropped = before.charAt(i);
          break;
        }
      }
      if (dropped != "undefined") {
        if (i - cursor != 0) {
          i -= i - cursor;
        }
        if (cursor == 0 || cursor == 3) {
          field.value =
            after.substring(0, i + 1) + " " + after.substring(i + 1, 10);
        } else if (cursor == 1 || cursor == 4) {
          field.value = after.substring(0, i) + " " + after.substring(i, 10);
        } else if (cursor == 2) {
          i + 1;
          field.value = before.substring(0, 3) + before.substring(4, 10);
          field.value =
            field.value.substring(0, 4) + " " + field.value.substring(4, 10);
        } else if (cursor == 5) {
          i + 1;
          field.value = before.substring(0, 6) + before.substring(7, 10);
          field.value = field.value + " ";
        } else {
          field.value = field.value + " ";
        }
        createSelection(field, i, i);
      }
    }
  }
}

//Criar seleção/Mover o cursor intermitente
function createSelection(field, start, end) {
  if (
    navigator.userAgent.indexOf("MSIE") != -1 ||
    !!document.documentMode == true
  ) {
    if (field.createTextRange) {
      var selRange = field.createTextRange();
      var range = field.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
      field.focus();
    } else if (field.setSelectionRange) {
      field.focus();
      field.setSelectionRange(start, startr);
    } else if (typeof field.selectionStart != "undefined") {
      field.selectionStart = start;
      field.selectionEnd = end;
      field.focus();
    }
  } else {
    if (field.createTextRange) {
      var selRange = field.createTextRange();
      selRange.collapse(true);
      selRange.moveStart("character", start);
      selRange.moveEnd("character", end);
      selRange.select();
      field.focus();
    } else if (field.setSelectionRange) {
      field.focus();
      field.setSelectionRange(start, end);
    } else if (typeof field.selectionStart != "undefined") {
      field.selectionStart = start;
      field.selectionEnd = end;
      field.focus();
    }
  }
}

//Substituir o char
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

//Recolocar a máscara
function putMaskAgain(field) {
  var natural = field.value.replace(/[/]/g, "");
  while (natural.length < 10) {
    natural += " ";
  }
  field.value =
    natural.substring(0, 2) +
    "/" +
    natural.substring(2, 4) +
    "/" +
    natural.substring(4, 8);

  for (var i = 0; i <= 10; i++) {
    if (
      isNaN(field.value.charAt(i)) &&
      field.value.charAt(i) != "/" &&
      (i != 2 || i != 5)
    ) {
      field.value = setCharAt(field.value, i, " ");
    } else if (i != 2 && i != 5 && field.value.charAt(i) == "/") {
      field.value = setCharAt(field.value, i, " ");
    } else if ((i == 2 || i == 5) && field.value.charAt(i) != "/") {
      field.value = setCharAt(field.value, i, "/");
    }
    createSelection(field, i, i);
  }
  createSelection(field, field.value.indexOf(" "), field.value.indexOf(" "));
  return;
}

function putTheRangeOnTheStart(field) {
  var start = field.selectionStart;
  var end = field.selectionEnd;
  if (start != end) {
    return false;
  }
  if (field.value.trim().length == 10) {
    return true;
  }
  createSelection(field, field.value.indexOf(" "), field.value.indexOf(" "));
}

// Remover Letras

function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  //var regex = /^[0-9.,]+$/;
  var regex = /^[0-9.]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

// Validar e Mascarar CPF ou CNPJ

var options = {
  onKeyPress: function (cpf, ev, el, op) {
      var masks = ['000.000.000-000', '00.000.000/0000-00'];
      $('.docs').mask((cpf.length > 14) ? masks[1] : masks[0], op);
  }
}

$('.docs').length > 11 ? $('.docs').mask('00.000.000/0000-00', options) : $('.docs').mask('000.000.000-00#', options);