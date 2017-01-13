(function() {
  var menuItem = document.createElement('a');
  var menuContent = document.getElementsByClassName('menu')[0];
  var infoContent = menuContent.parentElement.nextElementSibling;
  var syntaxOptions = JSON.parse(schemes);
  var syntaxCurrent;

  if (localStorage.getItem('gitHubSchemeSyntax') !== undefined) {
    syntaxCurrent = localStorage.getItem('gitHubSchemeSyntax');
  }else {
    syntaxCurrent = 'default';
  }

  // chrome.storage.sync.get('gitHubSchemeSyntax', function(item) { syntaxCurrent = item.gitHubSchemeSyntax !== undefined ? item.gitHubSchemeSyntax : 'default'; });

  menuItem.classList.add('gitScheme', 'js-selected-navigation-item', 'menu-item');
  menuItem.setAttribute('id', 'scheme');
  menuItem.setAttribute('href', '#scheme');
  menuItem.text = 'Syntax theme';

  menuContent.appendChild(menuItem);

  menuItem.addEventListener('click', function(e) {
    var elementSelected = document.getElementsByClassName('selected')[0];
    elementSelected.classList.remove('selected');
    e.target.classList.add('selected');
    showSchemeOption();
  });


  function showSchemeOption() {
    var title =  document.createElement('h3');
    var content = document.createElement('div');

    title.text = 'Syntax theme';
    content.classList.add('boxed-group-inner', 'clearfix');
    content.appendChild(title);

    syntaxOptions.forEach(function(v, i) {
      var syntaxItem = document.createElement('div');
      var syntaxImg = document.createElement('img');
      var syntaxCheck = document.createElement('input');
      var syntaxSpan = document.createElement('span');
      if (chrome.extension.getURL) {
        var srcImg = chrome.extension.getURL('img/' + v + '.png');
      }else {
        var srcImg = './img/' + v + '.png';
      }

      syntaxItem.classList.add('syntaxItem');

      syntaxImg.setAttribute('src', srcImg);

      syntaxCheck.setAttribute('type', 'radio');
      syntaxCheck.setAttribute('value', v);
      syntaxCheck.classList.add('syntaxCheck');
      syntaxCheck.setAttribute('name', 'userSyntax');

      if (syntaxCurrent == v) {
        syntaxCheck.setAttribute('checked', 'checked');
      }

      syntaxSpan.textContent = v;

      syntaxCheck.addEventListener('click', function(e) {
        saveOption(e.target);
      });

      syntaxItem.appendChild(syntaxImg);
      syntaxItem.appendChild(syntaxCheck);
      syntaxItem.appendChild(syntaxSpan);
      content.appendChild(syntaxItem);
    });

    infoContent.innerHTML = '';
    infoContent.appendChild(content);
  }

  function saveOption(target) {
    var value = target.value;
    if (chrome.storage.sync) {
      chrome.storage.sync.set({'gitHubSchemeSyntax': value}, function() {
        console.info('Settings saved: ' + value);
      });
    }else{
      localStorage.setItem('gitHubSchemeSyntax', value);
    }
  }

})();