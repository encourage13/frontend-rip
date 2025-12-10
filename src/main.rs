#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Открыть DevTools для окна с label "main"
            if let Some(window) = app.get_webview_window("main") {
                window.open_devtools();
                window.close_devtools(); // можно убрать, если хочешь, чтобы оставались открытыми
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
