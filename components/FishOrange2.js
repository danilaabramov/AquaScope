/**
*В данной папке находится код функций работы с анимацией рыбок и импортом svg компонентов
*Работа с svg компонентом FishOrange2
*/
import * as React from "react"
import Svg, { Path, G, Ellipse } from "react-native-svg"

export function FishOrange2() {
    return (
        <Svg
        viewBox="-170 -200 1200 1200" height={60} width={60}
    >
            <Path
                d="M405.37 653.09c152.61-7.66 345.82-89.98 345.82-89.98 78.61-7.53 41.55-41.89 41.55-41.89 106.31-55.45-12.22-47.01-12.22-47.01l-2.04-7.6s-9.78-117.67-161.84-246.25-394.29-152.7-394.29-152.7C-16.61 21.05 77.88 159.27 77.88 159.27c194.43 222.61 121.65 287.68 121.65 287.68s-59.74 55.48-126 78.79c-66.26 23.31-47.79 55.45-47.79 55.45s73.32 79.56 238.96 68.31"
               
                fill="#f8d42c"
                stroke="#1e1e1c"
                strokeWidth={2}
                strokeMiterlimit={10}
            />
            <Path
                d="M13.91 476.53s94.5-75.95-9.78-176c0 0-25.24-30.54 49.02-6.43l156.27 73.53s36.39 92.02-88.52 137.42c0 .01-124.33-9.76-106.99-28.52z"
              
                fill="#ea8526"
                stroke="#1e1e1c"
                strokeWidth={0.75}
                strokeMiterlimit={10}
            />
            <Path
                d="M402.76 543.67c9.38-.57 18.62 2.84 23.23 9.68 23.08 68.31-23.08 136.62-90.39 180.4-10.89 7.27-22.41 14.05-34.38 20.29-11.96 6.24-24.37 11.95-37.07 17.08-4.04-11.1-6.35-22.2-7.11-33.22-.76-11.02.01-21.97 1.97-32.79 14.64-66.37 65.42-124.43 139.71-161.45l4.04.01z"
                fill="#fecb39"
                stroke="#1e1e1c"
                strokeMiterlimit={10}
            />
            <Path
                fill="#FBE27E"
                d="M353.12 725.87c7.23-12.62 14.39-25.24 21.41-37.93 3.48-6.36 6.99-12.7 10.36-19.11 3.41-6.39 6.78-12.8 9.99-19.29 3.29-6.45 6.45-12.96 9.46-19.53 1.56-3.26 3-6.58 4.47-9.88 1.4-3.33 2.85-6.64 4.19-9.99 2.68-6.71 5.21-13.48 7.3-20.39s3.76-13.96 4.49-21.2c.16 7.29-1.01 14.58-2.59 21.7-1.67 7.12-3.83 14.11-6.28 20.99-4.89 13.77-10.96 27.07-17.47 40.09-6.58 13-13.68 25.72-21.23 38.16-7.55 12.45-15.48 24.66-24.1 36.38z"
            />
            <Path
                d="M783.81 472.22c-237.47-352.3-519.33-272.14-519.33-272.14s-70.06 17.48 82.28 200.11l-.54 24.91s-215.34 42.59-80.11 219.2l9.5 13.06s53.22-100.46 130.34-114.12c0 0 67.34-4.02 6.52 106.48 0 0 209.63-18.89 336.72-90.41 0 0 84.72 6.43 43.45-37.77 0 0 112.96-46.61-3.26-49.02l-5.57-.3z"
                
                fill="#ea8526"
                stroke="#1e1e1c"
                strokeWidth={2}
                strokeMiterlimit={10}
            />
            <Path
                d="M534.49 470.65c-52.14-.8-179.22 7.23-179.22 7.23s-39.1-68.31 39.1-124.57c0 0 112.96 70.72 146.64 74.74l-6.52 42.6z"
               
                fill="#fecb39"
                stroke="#1e1e1c"
                strokeWidth={2}
                strokeMiterlimit={10}
            />
            <Path
                d="M635.16 345.09s-156.41 61.88-78.21 204.13"
                
                fill="none"
                stroke="#1e1e1c"
                strokeWidth={6}
                strokeMiterlimit={10}
            />
            <G stroke="#1e1e1c" strokeMiterlimit={10}>
                <Ellipse cx={670.24} cy={439.12} rx={33.4} ry={24.71} fill="#1e1e1c" />
                <Ellipse cx={693.05} cy={438.01} rx={11.95} ry={7.94} fill="#fff" />
            </G>
            <Path
                fill="#FBE27E"
                d="M256.76 761.61c10.72-17.27 21.6-34.42 32.48-51.57l16.29-25.73c5.42-8.58 10.87-17.14 16.23-25.76 5.41-8.59 10.78-17.2 16.09-25.84 5.35-8.62 10.59-17.31 15.81-26 5.17-8.72 10.31-17.47 15.21-26.34 4.9-8.87 9.65-17.84 13.48-27.26-3 9.73-7.31 19.01-11.74 28.16-4.51 9.13-9.29 18.11-14.25 27-4.91 8.91-10.11 17.65-15.28 26.41-5.22 8.73-10.57 17.37-15.94 26-5.43 8.59-10.9 17.16-16.44 25.68-5.58 8.49-11.15 16.99-16.87 25.39-11.36 16.84-22.97 33.52-35.07 49.86zM362.02 376.43l42.15 16.52c14.05 5.5 28.06 11.09 42.15 16.46 14.04 5.52 28.15 10.84 42.31 16.03 7.08 2.6 14.18 5.13 21.33 7.5 7.14 2.4 14.34 4.68 21.74 6.17-3.74-.5-7.44-1.33-11.1-2.24-1.83-.46-3.65-.96-5.48-1.44l-5.45-1.55c-7.23-2.18-14.4-4.56-21.55-6.98-7.16-2.4-14.24-5.03-21.32-7.63-7.08-2.62-14.14-5.28-21.19-7.98-7.03-2.75-14.04-5.54-21.04-8.35-7-2.82-14.01-5.61-20.96-8.55l-20.85-8.81c-6.94-3.04-13.87-6.02-20.74-9.15zM353.12 415.6l44.86 9.41c14.95 3.1 29.89 6.21 44.88 9.02 14.97 2.9 29.98 5.6 45.05 7.87l5.65.88 5.66.75 5.67.76 2.83.38 2.84.29c3.79.39 7.58.82 11.38 1.18 3.8.23 7.61.5 11.43.79-3.82.13-7.65.24-11.48.32-3.83-.03-7.65-.23-11.49-.33-.96-.04-1.92-.07-2.87-.13l-2.86-.22-5.73-.44c-1.91-.15-3.82-.3-5.73-.49l-5.71-.65c-7.63-.77-15.19-1.98-22.78-3.06-3.78-.59-7.55-1.29-11.32-1.92-3.78-.63-7.54-1.34-11.3-2.06-7.52-1.44-15-3.03-22.49-4.63-7.45-1.73-14.92-3.38-22.34-5.28-14.82-3.71-29.59-7.72-44.15-12.44zM344.39 466.6c15.67-1.92 31.39-3.43 47.13-4.61 15.74-1.23 31.51-2.07 47.29-2.68 15.78-.58 31.59-.78 47.39-.43 3.95.14 7.9.17 11.85.39l11.84.71 11.8 1.2c3.92.5 7.82 1.18 11.71 1.81l-5.9-.51c-1.96-.16-3.92-.42-5.88-.51l-11.8-.52-11.81-.21c-3.94-.06-7.88 0-11.81-.01-3.94-.02-7.88.07-11.81.13-3.94.07-7.88.09-11.81.23l-11.81.3-11.81.43c-3.94.1-7.88.28-11.81.44l-11.81.5-23.63 1.07-47.32 2.27z"
            />
            <Path
                fill="#FBE27E"
                d="M25.41 322.56c16.06 3.19 31.86 7.45 47.51 12.2 7.84 2.33 15.59 4.96 23.34 7.59 7.73 2.68 15.39 5.57 23.03 8.51 15.24 5.99 30.24 12.66 44.77 20.28 3.64 1.9 7.23 3.87 10.8 5.9 3.53 2.1 7.08 4.16 10.53 6.38 6.89 4.45 13.64 9.15 19.86 14.48-7-4.25-14.09-8.23-21.33-11.93-7.2-3.76-14.54-7.25-21.92-10.63-1.84-.85-3.69-1.69-5.56-2.49l-5.56-2.48c-3.73-1.62-7.45-3.23-11.21-4.77-7.49-3.13-15.01-6.21-22.58-9.16-7.54-3.03-15.14-5.92-22.76-8.76-7.6-2.92-15.26-5.64-22.89-8.49l-46.03-16.63z"
                
            />
            <Path
                fill="#FBE27E"
                d="M46.9 376.43c12.77 3.12 25.37 6.68 37.92 10.36 6.29 1.79 12.53 3.75 18.8 5.6l18.74 5.75 37.4 11.65 9.37 2.83c3.12.96 6.25 1.86 9.39 2.72 1.57.44 3.13.9 4.71 1.29l2.37.61 2.37.56c3.17.71 6.36 1.47 9.64 1.43-.8.12-1.62.31-2.45.36l-2.49.11c-1.65-.07-3.32-.08-4.96-.25-.82-.07-1.65-.13-2.47-.22l-2.45-.31c-1.64-.19-3.27-.45-4.9-.7-6.5-1.07-12.95-2.4-19.35-3.91-12.79-3.02-25.43-6.55-37.95-10.44-6.24-2-12.49-3.98-18.7-6.08-6.19-2.16-12.4-4.25-18.53-6.56-12.29-4.54-24.5-9.33-36.46-14.8z"
               
            />
            <Path
                fill="#FBE27E"
                d="M46.9 427.47c11.56 1.54 22.99 3.51 34.4 5.56 11.4 2.07 22.77 4.25 34.12 6.45 11.35 2.19 22.69 4.44 34.04 6.5 5.68 1.03 11.36 2.03 17.06 2.88l4.28.6 4.29.47c1.43.11 2.87.28 4.31.29.72.02 1.45.1 2.17.06l2.18-.06c-2.81.82-5.75 1.16-8.68 1.38-1.47.13-2.93.13-4.4.19l-4.4.02c-5.86-.1-11.69-.55-17.49-1.14-11.61-1.21-23.11-3.07-34.52-5.28a546.134 546.134 0 01-33.99-7.75c-11.22-2.98-22.39-6.22-33.37-10.17z"
               
            />
            <Path
                fill="#FBE27E"
                d="M25.41 463.83c11.33 1.4 22.62 2.99 33.9 4.6l33.83 4.88c5.64.81 11.27 1.65 16.91 2.39 2.82.39 5.64.82 8.46 1.17 2.82.35 5.64.73 8.46 1.12 5.65.67 11.29 1.42 16.95 1.96 5.66.62 11.32.99 17.04 1.08-5.68.58-11.43.61-17.14.39-5.72-.19-11.41-.62-17.11-1.1-11.38-1.01-22.71-2.47-34.01-4.05-11.29-1.66-22.56-3.48-33.78-5.54-11.2-2.05-22.4-4.28-33.51-6.9z"
               
            />
        </Svg>
    )
}
