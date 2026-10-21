# WebRobologix
## Optimización y Minificación de CSS

Para regenerar las versiones minificadas de las hojas de estilo tras editar `styles.css` o `fa-icons.css`:

```bash
npx csso-cli -i styles.css -o styles.min.css
npx csso-cli -i fa-icons.css -o fa-icons.min.css
```
