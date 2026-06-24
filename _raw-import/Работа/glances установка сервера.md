---
tags:
  - веб-разработка
  - консоль
created: 2024-11-20
date: 2024-11-20
---
```
PowerShell 7.4.6
• C:\Users\user :  where python
• C:\Users\user :  python --version
Python 3.13.0
• C:\Users\user :  pip install --user glances
Collecting glances
  Downloading Glances-4.2.1-py3-none-any.whl.metadata (20 kB)
Collecting defusedxml (from glances)
  Downloading defusedxml-0.7.1-py2.py3-none-any.whl.metadata (32 kB)
Collecting packaging (from glances)
  Downloading packaging-24.2-py3-none-any.whl.metadata (3.2 kB)
Collecting psutil>=5.6.7 (from glances)
  Downloading psutil-6.1.0-cp37-abi3-win_amd64.whl.metadata (23 kB)
Collecting fastapi>=0.82.0 (from glances)
  Downloading fastapi-0.115.5-py3-none-any.whl.metadata (27 kB)
Collecting uvicorn (from glances)
  Downloading uvicorn-0.32.0-py3-none-any.whl.metadata (6.6 kB)
Collecting jinja2 (from glances)
  Downloading jinja2-3.1.4-py3-none-any.whl.metadata (2.6 kB)
Collecting requests (from glances)
  Downloading requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
Collecting starlette<0.42.0,>=0.40.0 (from fastapi>=0.82.0->glances)
  Downloading starlette-0.41.3-py3-none-any.whl.metadata (6.0 kB)
Collecting pydantic!=1.8,!=1.8.1,!=2.0.0,!=2.0.1,!=2.1.0,<3.0.0,>=1.7.4 (from fastapi>=0.82.0->glances)
  Downloading pydantic-2.9.2-py3-none-any.whl.metadata (149 kB)
Collecting typing-extensions>=4.8.0 (from fastapi>=0.82.0->glances)
  Downloading typing_extensions-4.12.2-py3-none-any.whl.metadata (3.0 kB)
Collecting MarkupSafe>=2.0 (from jinja2->glances)
  Downloading MarkupSafe-3.0.2-cp313-cp313-win_amd64.whl.metadata (4.1 kB)
Collecting charset-normalizer<4,>=2 (from requests->glances)
  Downloading charset_normalizer-3.4.0-cp313-cp313-win_amd64.whl.metadata (34 kB)
Collecting idna<4,>=2.5 (from requests->glances)
  Downloading idna-3.10-py3-none-any.whl.metadata (10 kB)
Collecting urllib3<3,>=1.21.1 (from requests->glances)
  Downloading urllib3-2.2.3-py3-none-any.whl.metadata (6.5 kB)
Collecting certifi>=2017.4.17 (from requests->glances)
  Downloading certifi-2024.8.30-py3-none-any.whl.metadata (2.2 kB)
Collecting click>=7.0 (from uvicorn->glances)
  Downloading click-8.1.7-py3-none-any.whl.metadata (3.0 kB)
Collecting h11>=0.8 (from uvicorn->glances)
  Downloading h11-0.14.0-py3-none-any.whl.metadata (8.2 kB)
Collecting colorama (from click>=7.0->uvicorn->glances)
  Downloading colorama-0.4.6-py2.py3-none-any.whl.metadata (17 kB)
Collecting annotated-types>=0.6.0 (from pydantic!=1.8,!=1.8.1,!=2.0.0,!=2.0.1,!=2.1.0,<3.0.0,>=1.7.4->fastapi>=0.82.0->glances)
  Downloading annotated_types-0.7.0-py3-none-any.whl.metadata (15 kB)
Collecting pydantic-core==2.23.4 (from pydantic!=1.8,!=1.8.1,!=2.0.0,!=2.0.1,!=2.1.0,<3.0.0,>=1.7.4->fastapi>=0.82.0->glances)
  Downloading pydantic_core-2.23.4-cp313-none-win_amd64.whl.metadata (6.7 kB)
Collecting anyio<5,>=3.4.0 (from starlette<0.42.0,>=0.40.0->fastapi>=0.82.0->glances)
  Downloading anyio-4.6.2.post1-py3-none-any.whl.metadata (4.7 kB)
Collecting sniffio>=1.1 (from anyio<5,>=3.4.0->starlette<0.42.0,>=0.40.0->fastapi>=0.82.0->glances)
  Downloading sniffio-1.3.1-py3-none-any.whl.metadata (3.9 kB)
Downloading Glances-4.2.1-py3-none-any.whl (736 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 736.4/736.4 kB 4.8 MB/s eta 0:00:00
Downloading fastapi-0.115.5-py3-none-any.whl (94 kB)
Downloading psutil-6.1.0-cp37-abi3-win_amd64.whl (254 kB)
Downloading defusedxml-0.7.1-py2.py3-none-any.whl (25 kB)
Downloading jinja2-3.1.4-py3-none-any.whl (133 kB)
Downloading packaging-24.2-py3-none-any.whl (65 kB)
Downloading requests-2.32.3-py3-none-any.whl (64 kB)
Downloading uvicorn-0.32.0-py3-none-any.whl (63 kB)
Downloading certifi-2024.8.30-py3-none-any.whl (167 kB)
Downloading charset_normalizer-3.4.0-cp313-cp313-win_amd64.whl (102 kB)
Downloading click-8.1.7-py3-none-any.whl (97 kB)
Downloading h11-0.14.0-py3-none-any.whl (58 kB)
Downloading idna-3.10-py3-none-any.whl (70 kB)
Downloading MarkupSafe-3.0.2-cp313-cp313-win_amd64.whl (15 kB)
Downloading pydantic-2.9.2-py3-none-any.whl (434 kB)
Downloading pydantic_core-2.23.4-cp313-none-win_amd64.whl (1.9 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.9/1.9 MB 9.1 MB/s eta 0:00:00
Downloading starlette-0.41.3-py3-none-any.whl (73 kB)
Downloading typing_extensions-4.12.2-py3-none-any.whl (37 kB)
Downloading urllib3-2.2.3-py3-none-any.whl (126 kB)
Downloading annotated_types-0.7.0-py3-none-any.whl (13 kB)
Downloading anyio-4.6.2.post1-py3-none-any.whl (90 kB)
Downloading colorama-0.4.6-py2.py3-none-any.whl (25 kB)
Downloading sniffio-1.3.1-py3-none-any.whl (10 kB)
Installing collected packages: urllib3, typing-extensions, sniffio, psutil, packaging, MarkupSafe, idna, h11, defusedxml, colorama, charset-normalizer, certifi, annotated-types, requests, pydantic-core, jinja2, click, anyio, uvicorn, starlette, pydantic, fastapi, glances
  WARNING: The script normalizer.exe is installed in 'C:\Users\user\AppData\Roaming\Python\Python313\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The script uvicorn.exe is installed in 'C:\Users\user\AppData\Roaming\Python\Python313\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The script fastapi.exe is installed in 'C:\Users\user\AppData\Roaming\Python\Python313\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The script glances.exe is installed in 'C:\Users\user\AppData\Roaming\Python\Python313\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed MarkupSafe-3.0.2 annotated-types-0.7.0 anyio-4.6.2.post1 certifi-2024.8.30 charset-normalizer-3.4.0 click-8.1.7 colorama-0.4.6 defusedxml-0.7.1 fastapi-0.115.5 glances-4.2.1 h11-0.14.0 idna-3.10 jinja2-3.1.4 packaging-24.2 psutil-6.1.0 pydantic-2.9.2 pydantic-core-2.23.4 requests-2.32.3 sniffio-1.3.1 starlette-0.41.3 typing-extensions-4.12.2 urllib3-2.2.3 uvicorn-0.32.0

[notice] A new release of pip is available: 24.2 -> 24.3.1
[notice] To update, run: python.exe -m pip install --upgrade pip
• C:\Users\user :  cd C:\Users\user\AppData\Roaming\Python\Python313\Scripts
• C:\Users\user\AppData\Roaming\Python\Python313\Scripts :  glances
glances: The term 'glances' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.

Suggestion [3,General]: The command "glances" was not found, but does exist in the current location.
PowerShell does not load commands from the current location by default (see ''Get-Help about_Command_Precedence'').

If you trust this command, run the following command instead:
• C:\Users\user\AppData\Roaming\Python\Python313\Scripts :  .\glances
Curses module not found. Glances cannot start in standalone mode.
• C:\Users\user\AppData\Roaming\Python\Python313\Scripts :  cd C:\Users\user\AppData\Roaming\Python\Python313\Scripts
• C:\Users\user\AppData\Roaming\Python\Python313\Scripts :  .\glances
Curses module not found. Glances cannot start in standalone mode.
• C:\Users\user\AppData\Roaming\Python\Python313\Scripts :  .\glances --webserver
Glances Web User Interface started on http://0.0.0.0:61208/
Glances RESTful API Server started on http://0.0.0.0:61208/api/4
INFO:     Started server process [3536]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:61208 (Press CTRL+C to quit)
```

---

## Связанные

- [[Design_Principles]]
- [[CDN]]
- [[Data Logic UI]]
- [[Design Patterns]]
- [[gRPC]]
- [[PWA]]
