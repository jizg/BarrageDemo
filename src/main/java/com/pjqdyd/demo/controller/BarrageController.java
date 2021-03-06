package com.pjqdyd.demo.controller;

import com.pjqdyd.demo.service.MyWebSocket;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * 弹幕主页Controller层
 */
@Controller
@RequestMapping("/barrage")
public class BarrageController {
    @Autowired
    private MyWebSocket myWebSocket;

    @GetMapping("/hello")
    public String SayHello(){
        String msg = "Hello";
        return msg;
    }

    @GetMapping("/index")
    public ModelAndView index(){
        return new ModelAndView("/index/index");
    }

    @GetMapping("/send")
    public void send(){
        String msg = "Hello EveryOne!";
        myWebSocket.sendMessage(msg);
    }

}
