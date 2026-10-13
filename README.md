# Diario

Página web mínima para anotar desde el móvil en un archivo `entrada.md` de un repositorio de GitHub.

- Escribe cada anotación como una línea `- AAAA-MM-DD HH:MM · texto` (hora de Madrid) al final de `entrada.md`.
- Muestra lo pendiente en la bandeja y las anotaciones abiertas que hay en `diario.md`.
- No guarda datos en este repositorio. El repositorio de destino y el token de GitHub se configuran en cada dispositivo y se quedan en su navegador (opcionalmente cifrados con un PIN).

El token debe ser un *fine-grained personal access token* limitado al repositorio de destino, con permiso **Contents: Read and write**.
