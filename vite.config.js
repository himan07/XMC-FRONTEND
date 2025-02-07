import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sms6.rmlconnect.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      },
      '/marketxcel': {
        target: 'https://api.marketxcel.co.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/marketxcel/, ''),
        headers: {
          'SupplierId': 'ff6a9e1fd6608945d4e4dca7ded50e85',
          'Token': '06c4e3995dafe6d7fd4afafa4ea2384d',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'SupplierId, Token, Content-Type'
        }
      }
    }
  }
})
