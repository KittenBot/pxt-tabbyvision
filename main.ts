//% color="#5c7cfa" weight=10 icon="\uf030"
//% groups='["Basic", "Classifier", "Face tracking", "Color blob tracking", "Line follower", "Traffic sign", "Number recognition", "Object tracking"]'


namespace tabbyvision { 

    export enum LCD_Direction {
        //% block=Front
        Front = 0,
        //% block=Back
        Back = 2
    }

    export enum ModelFunction { 
        //% block=TrafficSign
        TrafficSign = 0,
        //% block=LineFollower
        LineFollower = 1,
        //% block=ObjectTracking
        ObjectTracking = 2,
        //% block=ColorBlobTracking
        ColorBlobTracking = 3,
        //% block=FaceTracking
        FaceTracking = 4,
        //% block=NumberRecognition
        NumberRecognition = 5,
        //% block=ClassifyImage
        ClassifyImage = 6,
    }

    /*
    * VOC2012_Object Card
    */
    
    export enum VOC2012_Object {
        //% block=nothing
        nothing = -1,
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

        


    let btnEvent: (btn: number) => void

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
        
    }

    /**
     * When button is pressed
     * @param handler 
     */
    //% blockId=tabbyvision_on_button_pressed block="on button pressed"
    //% weight=98 group="Basic"
    export function onButtonPressed(handler: () => void): void {
        btnEvent = handler
    }

    /**
     * Switch Function
     * @param func Function; eg: LineFollower
     */
    //% blockId=tabbyvision_switch_function block="switch function %func"
    //% weight=97 group="Basic"
    //% func.fieldEditor="gridpicker"
    //% func.fieldOptions.columns=3
    export function switchFunction(func: ModelFunction): void {
        
    }

    /**
     * Color Blob Tracking Set Color
     * @param color 
     */
    //% blockId=tabbyvision_color_blob_tracking_set_color block="color blob tracking set color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=90 group="Color blob tracking"
    export function colorObjectTrackingSetColor(color: number): void {
        
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
        return 0
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
        return false
    }

    /**
     * Traffic Sign Get Position
     * @returns position [x, y]
     */
    //% blockId=tabbyvision_traffic_sign_get_position block="traffic sign get position"
    //% weight=79 group="Traffic sign"
    export function trafficSignGetPosition(): number[] {
        return [0, 0]
    }

    /**
     * Line Follower Set Threshold
     */
    //% blockId=tabbyvision_line_follower_set_threshold block="line follower set threshold %threshold"
    //% weight=70 group="Line follower"
    export function lineFollowerSetThreshold(threshold: number): void {
        
    }

    /**
     * Line Follower Get Position
     * @returns bias x
     */
    //% blockId=tabbyvision_line_follower_get_position block="line follower get position"
    //% weight=69 group="Line follower"
    export function lineFollowerGetPosition(): number {
        return 0
    }

    /**
    * Face Tracking Get Position 
    */
    //% block = "face tracking get %res"
    //% blockId=tabbyvision_face_tracking_get_position
    //% weight=60 group="Face tracking"
    export function faceTrackingGetPosition(res: GetResult): number {
        return 0
    }

    /**
     * Object Tracking Get Class
     * @param object VOC2012_Object; eg: VOC2012_Object.cat
     */
    //% block="object tracking get class: %object"
    //% blockId=tabbyvision_object_tracking_get_class
    //% weight=50 group="Object tracking"
    export function objectTrackingGetClass(object: VOC2012_Object): boolean {

            return false
    }

    /**
     * Object Tracking Get Position
     * @returns position [x, y]
     */
    //% blockId=tabbyvision_object_tracking_get_position block="object tracking get position"
    //% weight=49 group="Object tracking"
    export function objectTrackingGetPosition(): number[] {
        return [0, 0]
    }

    /**
     * Classify Image Reset
     */
    //% blockId=tabbyvision_classify_image_reset block="classify image reset"
    //% weight=40 group="Classifier"
    export function classifyImageReset(): void {
        
    }

    /**
     * Classify Image Add Tag
     * @param name tag; eg: apple
     */
    //% blockId=tabbyvision_classify_image_add_tag block="classify image add tag %name"
    //% weight=39 group="Classifier"
    export function classifyImageAddTagID(name: string): void {
        
    }

    /**
     * Classify Image Get Class
     * @returns class
     */
    //% blockId=tabbyvision_classify_image_get_class block="classify image get class"
    //% weight=38 group="Classifier"
    export function classifyImageGetClass(): string {
        return ''
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
        let str = `K44 ${path}`
        serial.writeLine(str)
    }


    /**
     * Number Recognition Get Number
     * @param number NumberCard; eg: NumberCard.6
     */
    //% block = "number recognition get number %number "
    //% blockId=tabbyvision_number_recognition_get_number 
    //% weight=30 group="Number recognition"
    export function numberRecognitionGetNumber(number: NumberCard): boolean {
        return false
    }

}
