import 'antd/dist/antd.css';
import './style.css';

function applyRegex(str: string) {
  const strExample = `{
    "a" : "loqueseapordelante/"\${?VAL1},
    "b" : \${VAL2}"/loqueseaenmedio/"\${VAL3},
    "c" : \${VAL4}"/loqueseapordetras",
    "d" : "loqueseapordelante/"\${?VAL5.as}"/loqueseaenmedio/"\${VAL6}"/loqueseapordetras",
    "e" : \${VAL7},
    "f" : \${VAL8}
}`;
  const regexIn1 = /"(\$\{\??[\w_\-\.]+\})"/gm;
  const regexIn2 = /(\$\{\??[\w_\-\.]+\})"/gm;
  const regexIn3 = /"(\$\{\??[\w_\-\.]+\}),/gm;
  const regexOut1 = /(\$\{\??[\w_\-\.]+\})/gm;
  const regexOut2 = /""/gm;
  const regexOut3 = / "(\$\{\??[\w_\-\.]+\})"/gm;
  const substIn1 = '$1';
  const substIn2 = '"$1';
  const substIn3 = '$1",';
  const substOut1 = '"$1"';
  const substOut2 = '';
  const substOut3 = ' $1';

  // The substituted value will be contained in the result variable
  const ForBack = str.replaceAll(regexIn1, substIn1).replaceAll(regexIn2, substIn2).replaceAll(regexIn3, substIn3);

  const FromBack = ForBack
    .replaceAll(regexOut1, substOut1)
    .replaceAll(regexOut2, substOut2)
    .replaceAll(regexOut3, substOut3);

  return { FromBack, ForBack };
};

function syntaxHighlight(json: string) {
  json = json.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;');
  const jsonWithEnvVar = json.replaceAll(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else if (match.includes("${")) {
        // match = match.replaceAll('"', '');
        cls = 'envar';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }

    return '<span class="' + cls + '">' + match + '</span>';
  });
  return applyRegex(jsonWithEnvVar).ForBack;
}

export const StringJsonCommentted = () => {
  const data = {
    atalaya: {
      frame: {
        cutoffDate: '${ODATE}',
        targetName: 'master',
        source: 'zaqu${ODATE}iel',
        pathName: '/data/master/potatoe/master${ODATE}',
        color: 'red'
      },
      inputRoute: {
        paths: [
          '${ODATE}/data/master/red/master'
        ],
        type: 'abrok'
      },
      rules: [
        {
          class: 'com.zaquiel.rule.class.potatoe',
          config: {
            column: '1',
            fail: false,
            id: '1234567890',
            value: '2022-03-28T00:00:00.000Z',
          }
        }
      ]
    }
  };
  const stringJSON = JSON.stringify(data, null, 2);
  const highlightJson = syntaxHighlight(stringJSON);
  const stringJSONParsedEnv: string = '{\n  "atalaya": {\n    "frame": {\n      "cutoffDate": ${ODATE},\n      "targetName": "master",\n      "source": "zaqu"${ODATE}"iel",\n      "pathName": "/data/master/potatoe/master"${ODATE},\n      "color": "red"\n    },\n    "inputRoute": {\n      "paths": [\n        ${ODATE}"/data/master/red/master"\n      ],\n      "type": "abrok"\n    },\n    "rules": [\n      {\n        "class": "com.zaquiel.rule.class.potatoe",\n        "config": {\n          "column": "1",\n          "fail": false,\n          "id": "1234567890",\n          "value": "2022-03-28T00:00:00.000Z"\n        }\n      }\n    ]\n  }\n}';

  const lines = stringJSONParsedEnv.split('\n');
  const ElementsJSON = lines.map((lineString) => {
    let [key,value] = lineString.split(': ');

    let keyParsed = key && key.trim();
    const valueParsed = value && value.trim().replaceAll(',', '');

    // exception case: line where key is a value because is only a value (example: value of a list)
    if (keyParsed && keyParsed.length > 2 && !valueParsed) {
      const [preKey, postKey] = lineString.split(keyParsed);
      return (<div>
        <pre>
          <span>{preKey}</span>
          <span className="string">{keyParsed}</span>
          <span>{postKey}</span>
        </pre>
      </div>);
    }

    if (valueParsed) {
      const [preKey, postKey] = lineString.split(keyParsed);
      const [preValue, postValue] = postKey.split(valueParsed);
      return (<div>
        <pre>
          <span>{preKey}</span>
          <span className="key">{keyParsed}</span>
          <span>{preValue}</span>
          <span className="string">{valueParsed}</span>
          <span>{postValue}</span>
        </pre>
      </div>);
    }
    return (
      <div>
        <pre>
          {lineString}
        </pre>
      </div>
    );
  });
  debugger;
  return (
    <>
      {/*<pre>
        <div className="Container" dangerouslySetInnerHTML={{__html: highlightJson}}></div>
      </pre>*/}
      {ElementsJSON}
    </>
  );
}
