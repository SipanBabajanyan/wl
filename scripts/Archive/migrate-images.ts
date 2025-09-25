import { updateImagePaths } from './update-image-paths'
import { cleanupOldImages } from './cleanup-old-images'

/**
 * Главный скрипт для миграции изображений с JPEG на PNG
 * Выполняет полный процесс замены изображений:
 * 1. Обновляет пути в базе данных
 * 2. Удаляет старые JPEG файлы
 */

async function migrateImages() {
  try {
    console.log('🚀 Начинаем миграцию изображений с JPEG на PNG...')
    console.log('=' .repeat(60))
    
    // Шаг 1: Обновляем пути в базе данных
    console.log('\n📝 ШАГ 1: Обновление путей в базе данных')
    console.log('-'.repeat(40))
    await updateImagePaths()
    
    // Шаг 2: Очищаем старые JPEG файлы
    console.log('\n🧹 ШАГ 2: Очистка старых JPEG файлов')
    console.log('-'.repeat(40))
    await cleanupOldImages()
    
    console.log('\n' + '='.repeat(60))
    console.log('🎉 МИГРАЦИЯ ИЗОБРАЖЕНИЙ ЗАВЕРШЕНА УСПЕШНО!')
    console.log('=' .repeat(60))
    
    console.log('\n📋 Что было сделано:')
    console.log('  ✅ Обновлены пути к изображениям в базе данных')
    console.log('  ✅ Удалены старые JPEG файлы')
    console.log('  ✅ Все продукты теперь используют PNG изображения')
    
    console.log('\n💡 Рекомендации:')
    console.log('  - Проверьте работу сайта')
    console.log('  - Убедитесь, что все изображения загружаются корректно')
    console.log('  - При необходимости сделайте резервную копию базы данных')

  } catch (error) {
    console.error('\n❌ ОШИБКА ПРИ МИГРАЦИИ ИЗОБРАЖЕНИЙ:', error)
    console.log('\n🔧 Возможные решения:')
    console.log('  - Проверьте подключение к базе данных')
    console.log('  - Убедитесь, что все PNG файлы существуют')
    console.log('  - Проверьте права доступа к файлам')
    throw error
  }
}

// Запускаем миграцию
if (require.main === module) {
  migrateImages()
    .then(() => {
      console.log('\n✅ Миграция выполнена успешно')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Ошибка миграции:', error)
      process.exit(1)
    })
}

export { migrateImages }
