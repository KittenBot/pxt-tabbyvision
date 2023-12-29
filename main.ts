namespace tabbyvision {

    let koiNewEventId = 1228

    // cached results
    let _className: string = ''
    let _posX: number = -1
    let _posY: number = -1
    let _posW: number = -1
    let _posH: number = -1


    export enum LCD_Direction {
        //% block=Front
        Front = 0,
        //% block=Back
        Back = 2
    }

    export enum BTNCmd {
        //% block="A"
        A = 1,
        //% block="B"
        B = 2,
        //% block="A+B"
        AB = 3
    }

    export enum ColorList {
        //% block="Red"
        Red = 0,
        //% block="Blue"
        Blue = 1,
        //% block="Green"
        Green = 2,
        //% block="Yellow"
        Yellow = 3,
        //% block="Orange"
        Orange = 4,
        //% block="Purple"
        Purple = 5,
        //% block="Pink"
        Pink = 6,
        //% block="White"
        White = 7,
        //% block="Black"
        Black = 8,
        //% block="Custom"
        Custom = 9,
    }


    export enum ModelFunction {
        //% block=TrafficSign
        TrafficSign = 0x1,
        //% block=ObjectTracking
        ObjectTracking = 0x2,
        //% block=FaceTracking
        FaceTracking = 0x3,
        //% block=NumberRecognition
        NumberRecognition = 0x4,
        //% block=ClassifyImage
        ClassifyImage = 0x5,
        //% block=LetterRecognition
        LetterRecognition = 0x6,   
    }

    export enum CvFunction {
        //% block=ColorBlobTracking
        ColorBlobTracking = 0x10,
        //% block=LineFollower
        LineFollower = 0x20,
    }

    export enum FullFunction {
        //% block=TrafficSign
        TrafficSign = 0x1,
        //% block=ObjectTracking
        ObjectTracking = 0x2,
        //% block=FaceTracking
        FaceTracking = 0x3,
        //% block=NumberRecognition
        NumberRecognition = 0x4,
        //% block=ClassifyImage
        ClassifyImage = 0x5,
        //% block=LetterRecognition
        LetterRecognition = 0x6,
        //% block=ColorBlobTracking
        ColorBlobTracking = 0x10,
        //% block=LineFollower
        LineFollower = 0x20,
    }

    export enum ColorNames {
        //% block=red
        red = 1,
        //% block=blue
        blue = 2,
        //% block=yellow
        yellow = 3,
    }



    /*
    * VOC2012_Object Card
    */

    export enum VOC2012_Object {
        //% block=aeroplane
        aeroplane = 0,
        //% block=bicycle
        bicycle = 1,
        //% block=bird
        bird = 2,
        //% block=boat
        boat = 3,
        //% block=bottle
        bottle = 4,
        //% block=bus
        bus = 5,
        //% block=car
        car = 6,
        //% block=cat
        cat = 7,
        //% block=chair
        chair = 8,
        //% block=cow
        cow = 9,
        //% block=diningtable
        diningtable = 10,
        //% block=dog
        dog = 11,
        //% block=horse
        horse = 12,
        //% block=motorbike
        motorbike = 13,
        //% block=person
        person = 14,
        //% block=pottedplant
        pottedplant = 15,
        //% block=sheep
        sheep = 16,
        //% block=sofa
        sofa = 17,
        //% block=train
        train = 18,
        //% block=tvmonitor
        tvmonitor = 19,
    }

    /*
    * Traffic sign Card
    */
    export enum TrafficCard {
        //% block="Forward"
        forward = 1,
        //% block="Turn around"
        turnaround = 2,
        //% block="Left"
        left = 3,
        //% block="Right"
        right = 4,
        //% block="Stop"
        stop = 5,
        //% block="Speed limit"
        speedlimit = 6,
        //% block="Tunnel"
        tunnel = 7
    }

    /**
    * Number Card
    */
    export enum NumberCard {
        //% block="0"
        zero = 0,
        //% block="1"
        one = 1,
        //% block="2"
        two = 2,
        //% block="3"
        three = 3,
        //% block="4"
        four = 4,
        //% block="5"
        five = 5,
        //% block="6"
        six = 6,
        //% block="7"
        seven = 7,
        //% block="8"
        eight = 8,
        //% block="9"
        nine = 9
    }
    /**
    * Letter Card
    */
    export enum LetterCard {
        //% block="A"
        A = 0,
        //% block="B"
        B = 1,
        //% block="C"
        C = 2,
        //% block="D"
        D = 3,
        //% block="E"
        E = 4,
        //% block="F"
        F = 5
    }

    /**
    * Result list
    */
    export enum GetResult {
        //% block="X"
        result_X = 1,
        //% block="Y"
        result_Y = 2,
        //% block="W"
        result_W = 3,
        //% block="H"
        result_H = 4
    }

    /**
     * Result XY
     */
    export enum GetResultXY {
        //% block="X"
        result_X = 1,
        //% block="Y"
        result_Y = 2
    }




    let btnEvent: (btn: number) => void

    function trim(n: string): string {
        while (n.charCodeAt(n.length - 1) < 0x1f) {
            n = n.slice(0, n.length - 1)
        }
        return n
    }

    let modelCmd: number[] = [81,82,83,84];
    serial.onDataReceived('\n', function () {
        let a = serial.readUntil('\n')
        if (a.charAt(0) == 'K') {
            a = trim(a)
            let b = a.slice(1, a.length).split(' ')
            let cmd = parseInt(b[0])
            if (cmd == 42) { // feature extraction
                _className = b[1]
            } else if (cmd == 31) { // face tracking
                _posX = parseInt(b[1])
                _posY = parseInt(b[2])
                _posW = parseInt(b[3])
                _posH = parseInt(b[4])
                _className = b[5]
            } else if (cmd == 15) { // color blob tracking
                _posX = parseInt(b[1])
                _posY = parseInt(b[2])
                _posW = parseInt(b[3])
                _posH = parseInt(b[4])
            } else if (cmd == 19) { // line follower color
                _posX = parseInt(b[1])
                _posY = parseInt(b[2])
            } else if (modelCmd.indexOf(cmd) != -1) { // model cmd
                _posX = parseInt(b[1])
                _posY = parseInt(b[2])
                _posW = parseInt(b[3])
                _posH = parseInt(b[4])
                _className = b[5]
            } else if (cmd == 3) { // btn
                control.raiseEvent(koiNewEventId, parseInt(b[1]))
            }
        }
    })

    function getResultXYWH(res: GetResult): number {
        let ret = -1
        if (res == GetResult.result_X) {
            ret = _posX
            _posX = -1
        } else if (res == GetResult.result_Y) {
            ret = _posY
            _posY = -1
        } else if (res == GetResult.result_W) {
            ret = _posW
            _posW = -1
        } else if (res == GetResult.result_H) {
            ret = _posH
            _posH = -1
        }
        return ret
    }

    function getResultXY(res: GetResultXY): number {
        let ret2 = -1
        if (res == GetResultXY.result_X) {
            ret2 = _posX
            _posX = -1
        } else if (res == GetResultXY.result_Y) {
            ret2 = _posY
            _posY = -1
        }
        return ret2
    }

    function getResultClass(): string {
        let ret3 = _className
        _className = ''
        return ret3
    }


    /**
     * Init the tabbyvision library with serial connection
     * @param tx Tx pin; eg: SerialPin.P13
     * @param rx Rx pin; eg: SerialPin.P14
     */
    //% blockId=tabbyvision_init block="init tabbyvision Tx %tx Rx %rx"
    //% weight=100 group="Basic"
    export function init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate115200);
        serial.setTxBufferSize(64)
        serial.setRxBufferSize(64)
        serial.readString()
        serial.writeString('\n\n')
    }

    /**
     * LCD Direction
     * @param dir Direction; eg: 0
     */
    //% blockId=tabbyvision_lcd_direction block="LCD direction %dir"
    //% weight=99 group="Basic"
    export function lcdDirection(dir: LCD_Direction): void {
        serial.writeLine(`K6 ${dir}`)
    }

    /**
     * When button is pressed
     * @param handler 
     */
    //% blockId=tabbyvision_on_button_pressed block="on button |%btn pressed"
    //% weight=98 group="Basic"
    export function onButtonPressed(btn: BTNCmd, handler: () => void) {
        control.onEvent(koiNewEventId, btn, handler);
    }

    /**
     * Switch Function
     * @param func Function; eg: LineFollower
     */
    //% blockId=tabbyvision_switch_function block="switch function %func"
    //% weight=97 group="Basic"
    //% func.fieldEditor="gridpicker"
    //% func.fieldOptions.columns=3
    export function switchFunction(func: FullFunction): void {
        serial.writeLine(`K97 ${func}`)
    }

    /**
     * Enable Model + CV
     * @param model Function; eg: FaceTracking
     * @param cv Function; eg: ColorBlobTracking
     */
    //% blockId=tabbyvision_enable_model_cv block="enable model %model cv %cv"
    //% weight=96 group="Basic"
    //% model.fieldEditor="gridpicker"
    //% model.fieldOptions.columns=3
    //% advanced=true
    export function enableModelCV(model: ModelFunction, cv: CvFunction): void {
        serial.writeLine(`K97 ${model+cv}`)
    }


    /**
     * Color Blob Tracking Set Color
     * @param color 
     */
    //% blockId=tabbyvision_color_blob_tracking_set_color block="color blob tracking set color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=90 group="Color blob tracking"
    export function colorObjectTrackingSetColor(color: ColorList): void {
        serial.writeLine(`K18 ${color}`)
    }

    /**
     * Color Blob Tracking Calibrate Color
     */
    //% blockId=tabbyvision_color_blob_tracking_calibrate block="color blob tracking calibrate"
    //% weight=90 group="Color blob tracking"
    export function colorObjectTrackingCalibrate(): void {
        serial.writeLine(`K16`)
    }

    /**
     * Color Blob Tracking Get Result
     * @param res for color; eg: GetResult.result_X
     */
    //% block = "color blob tracking get result %res"
    //% blockId=tabbyvision_color_blob_tracking_get_result
    //% weight=89 group="Color blob tracking"
    //% res.fieldEditor="gridpicker"
    //% res.fieldOptions.columns=4

    export function colorObjectTrackingGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Traffic Sign Get Class
     * @returns class
     */
    //% block="traffic sign get class:%tsclass"
    //% blockId=tabbyvision_traffic_sign_get_class
    //% weight=80 group="Traffic sign"
    //% tsclass.fieldEditor="gridpicker"
    //% tsclass.fieldOptions.columns=2
    export function trafficSignGetClass(tsclass: TrafficCard): boolean {
        let ret4 = _className == tsclass.toString()
        _className = ''
        return ret4
    }

    /**
     * Traffic Sign Get Position
     * @returns position; eg: GetResult.result_X
     */
    //% blockId=tabbyvision_traffic_sign_get_position block="traffic sign get position"
    //% weight=79 group="Traffic sign"
    export function trafficSignGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Line Follower Set Key Color
     * @param color
     */
    //% blockId=tabbyvision_line_follower_set_threshold block="line follower set threshold %threshold"
    //% weight=70 group="Line follower"
    export function lineFollowerSetThreshold(key: ColorNames) {
        serial.writeLine(`K19 ${key}`)
    }

    /**
     * Line Follower Get Position
     * @returns bias x
     */
    //% blockId=tabbyvision_line_follower_get_position block="line follower get position"
    //% weight=69 group="Line follower"
    export function lineFollowerGetPosition(res: GetResultXY): number {
        return getResultXY(res)
    }

    /**
    * Face Tracking Get Position 
    */
    //% block = "face tracking get %res"
    //% blockId=tabbyvision_face_tracking_get_position
    //% weight=60 group="Face tracking"
    export function faceTrackingGetPosition(res: GetResult): number {
        return getResultXYWH(res)
    }

    /**
     * Object Tracking is Class
     * @param object VOC2012_Object; eg: VOC2012_Object.cat
     */
    //% block="object tracking is class %object ?"
    //% blockId=tabbyvision_object_tracking_is_class
    //% weight=50 group="Object tracking"
    export function objectTrackingIsClass(obj: VOC2012_Object): boolean {
        let objectList = ["aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow", "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]
        return _className == objectList[obj]
    }

    /**
     * Object Tracking Get Class
     */
    //% block="object tracking get class"
    //% blockId=tabbyvision_object_tracking_get_class
    //% weight=50 group="Object tracking"
    export function objectTrackingGetClass(): string {
        let ret52 = _className
        return ret52
    }

    /**
     * Object Tracking Get Position
     * @param axis for x; eg: GetResult.result_X
     * @returns position
     */
    //% blockId=tabbyvision_object_tracking_get_position block="object tracking get position %axis"
    //% weight=49 group="Object tracking"
    export function objectTrackingGetPosition(axis: GetResult): number {
        return getResultXYWH(axis)
    }

    /**
     * Classify Image Reset
     */
    //% blockId=tabbyvision_classify_image_reset block="classify image reset"
    //% weight=40 group="Classifier"
    export function classifyImageReset(): void {
        serial.writeLine(`K45`)
    }

    /**
     * Classify Image Add Tag
     * @param name tag; eg: apple
     */
    //% blockId=tabbyvision_classify_image_add_tag block="classify image add tag %name"
    //% weight=39 group="Classifier"
    export function classifyImageAddTagID(name: string): void {
        serial.writeLine(`K41 ${name}`)
    }

    /**
     * Classify Image Get Class
     * @returns class
     */
    //% blockId=tabbyvision_classify_image_get_class block="classify image get class"
    //% weight=38 group="Classifier"
    export function classifyImageGetClass(): string {
        return getResultClass()
    }

    /**
     * Classify Image Save
     * @param path json to save; eg: model.json
     */
    //% blockId=tabbyvision_classify_image_save block="classify image save classifier %path"
    //% group="Classifier" weight=35
    export function classifyImageSave(path: string): void {
        let str = `K43 ${path}`
        serial.writeLine(str)
    }

    /**
     * Classify Image Load
     * @param path json to load; eg: model.json
     */
    //% blockId=tabbyvision_classify_image_load block="classify image load classifier %path"
    //% group="Classifier" weight=34
    export function classifyImageLoad(path: string): void {
        let str2 = `K44 ${path}`
        serial.writeLine(str2)
    }


    /**
     * Number Recognition is Number ?
     * @param number NumberCard; eg: NumberCard.6
     */
    //% block = "number recognition number is %number ?"
    //% blockId=tabbyvision_number_recognition_is_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionIsNumber(num: NumberCard): boolean {
        return getResultClass() == num.toString()
    }

    /**
     * Number Recognition Get Number
     */
    //% block = "number recognition get number "
    //% blockId=tabbyvision_number_recognition_get_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionGetNumber(): number {
        let transfer = getResultClass()
        if (transfer == ''){
            return -1
        }
        return parseInt(transfer)
    }


    /**
     * Letter Recognition is Letter ?
     * @param letter LetterCard; eg: LetterCard.6
     */
    //% block = "letter recognition letter is %letter ?"
    //% blockId=tabbyvision_letter_recognition_is_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionIsLetter(letter: LetterCard): boolean {
        let letterList = ["A","B","C","D","E","F"]
        return getResultClass() == letterList[letter]
    }

    /**
     * Letter Recognition Get Letter
     */
    //% block = "letter recognition get letter "
    //% blockId=tabbyvision_letter_recognition_get_letter 
    //% weight=30 group="Letter recognition"
    export function letterRecognitionGetLetter(): string {
        return getResultClass()
    }

}
