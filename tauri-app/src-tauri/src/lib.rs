pub mod commands;
pub mod engine;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_android_fs::init())
        .invoke_handler(tauri::generate_handler![
            commands::save_image,
            commands::list_image_files,
            engine::encode_image
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
