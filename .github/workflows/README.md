# GitHub Actions Workflows for Version Management

Este directorio contiene workflows de GitHub Actions que automatizan la actualización de versiones en `package.json` cuando se hace push de un tag.

## Workflows Disponibles

### 1. `update-version-on-tag.yml` (Recomendado)
**Funcionalidad completa**: Actualiza automáticamente la versión en `package.json` y hace commit de los cambios.

**Características:**
- ✅ Actualiza `package.json` con la versión del tag
- ✅ Hace commit automático de los cambios
- ✅ Actualiza el tag para que apunte al nuevo commit
- ✅ Usa tu script existente `scripts/update-version-tag.js`

**Uso:**
```bash
git tag v1.2.3
git push origin v1.2.3
```

### 2. `update-version-simple.yml` (Conservador)
**Funcionalidad básica**: Solo actualiza la versión y muestra los cambios, sin hacer commit automático.

**Características:**
- ✅ Actualiza `package.json` con la versión del tag
- ✅ Muestra los cambios en los logs
- ✅ Opcionalmente crea un Pull Request
- ✅ No modifica el repositorio automáticamente

## Configuración

### Permisos Requeridos

Para que los workflows funcionen correctamente, necesitas configurar los permisos en tu repositorio:

1. Ve a **Settings** > **Actions** > **General**
2. En la sección **Workflow permissions**, selecciona:
   - **Read and write permissions**
   - **Allow GitHub Actions to create and approve pull requests**

### Configuración del Repositorio

Asegúrate de que tu repositorio tenga configurado:
- Node.js 18+ como runtime
- El script `scripts/update-version-tag.js` existente
- Un `package.json` válido

## Comparación con el Pre-push Hook

| Aspecto | Pre-push Hook | GitHub Actions |
|---------|---------------|----------------|
| **Ejecución** | Local, antes del push | En la nube, después del push |
| **Dependencias** | Requiere Node.js local | Se ejecuta en runner limpio |
| **Confiabilidad** | Depende del entorno local | Entorno consistente |
| **Logs** | Solo en terminal local | Logs persistentes en GitHub |
| **Notificaciones** | Ninguna | Notificaciones en GitHub |
| **Colaboración** | Solo para el desarrollador | Visible para todo el equipo |

## Ventajas de GitHub Actions

1. **Consistencia**: Se ejecuta en un entorno limpio y predecible
2. **Visibilidad**: Todo el equipo puede ver los logs y resultados
3. **Notificaciones**: Integración con GitHub para notificaciones
4. **Historial**: Logs persistentes de todas las ejecuciones
5. **Escalabilidad**: No depende de la configuración local de cada desarrollador

## Migración desde Pre-push Hook

Si quieres migrar completamente desde tu pre-push hook:

1. **Mantén ambos temporalmente**: Usa GitHub Actions pero mantén el hook como respaldo
2. **Prueba en un branch**: Ejecuta el workflow en un branch de prueba
3. **Desactiva el hook**: Una vez que estés seguro, puedes desactivar el pre-push hook

## Troubleshooting

### Error: "Permission denied"
- Verifica que los permisos del workflow estén configurados correctamente
- Asegúrate de que el repositorio permita que Actions escriban en el contenido

### Error: "Tag already exists"
- El workflow maneja automáticamente la actualización de tags existentes
- Si persiste, verifica que el tag no esté siendo usado por otro proceso

### No se actualiza la versión
- Verifica que el tag siga el formato esperado (ej: `v1.2.3`)
- Revisa los logs del workflow para ver si hay errores en el script

## Personalización

Puedes personalizar los workflows modificando:

- **Triggers**: Cambia los patrones de tags en `on.push.tags`
- **Node version**: Modifica `node-version` en el setup
- **Commit message**: Personaliza el mensaje de commit
- **Branch name**: Cambia el nombre del branch para PRs (en la versión simple)
